'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase/client';
import {
  ShieldAlert,
  Users,
  CreditCard,
  History,
  Layers,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  Sparkles,
  School,
  MapPin,
  Calendar,
  LifeBuoy,
  MessageSquare,
  Send,
  Mail,
} from 'lucide-react';
import {
  fetchAllSupportTickets,
  updateSupportTicketStatus,
  SupportTicket,
  TicketStatus,
  OFFICIAL_SUPPORT_EMAIL,
} from '@/lib/services/supportService';

interface MetricsData {
  total_users: number;
  active_users: number;
  pending_verification_users: number;
  suspended_users: number;
  deactivated_users: number;
  onboarded_users: number;
  pending_onboarding_users: number;
  users_by_board: Record<string, number>;
  users_by_grade: Record<string, number>;
  users_by_primary_subject: Record<string, number>;
  users_by_institution: Record<string, number>;
  users_by_location: Record<string, number>;
  active_subscriptions_by_plan: Record<string, number>;
  subscriptions_by_status: Record<string, number>;
  recent_admin_activity: Array<{
    audit_id: string;
    actor_id: string;
    action_type: string;
    target_user_id: string;
    target_resource: string;
    reason: string;
    created_at: string;
  }>;
}

interface UserRow {
  user_id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  institution_name: string | null;
  location: string | null;
  role: string;
  account_status: string;
  board_id: string | null;
  grade_level: number | null;
  onboarding_completed: boolean;
  created_at: string;
  primary_subject: string | null;
  active_plan_id: string | null;
  is_customer_admin: boolean;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isCustomerAdmin, isSuperAdmin, isLoading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'metrics' | 'users' | 'plans' | 'audit' | 'tickets'>('metrics');
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);

  // User List State
  const [users, setUsers] = useState<UserRow[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [boardFilter, setBoardFilter] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Support Tickets State
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const [ticketStatusFilter, setTicketStatusFilter] = useState('');
  const [ticketSearch, setTicketSearch] = useState('');
  const [emailAlertToast, setEmailAlertToast] = useState<string | null>(null);
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [ticketAdminNotes, setTicketAdminNotes] = useState<Record<string, string>>({});
  const [updatingTicketId, setUpdatingTicketId] = useState<string | null>(null);

  // Action Modals State
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [modalAction, setModalAction] = useState<'status' | 'role' | 'reassign' | 'subscription' | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [newStatus, setNewStatus] = useState('ACTIVE');
  const [newRole, setNewRole] = useState('STUDENT');
  const [reassignBoard, setReassignBoard] = useState('CBSE');
  const [reassignGrade, setReassignGrade] = useState(6);
  const [reassignMode, setReassignMode] = useState<'MODE_A' | 'MODE_B'>('MODE_A');
  const [reassignSubjects, setReassignSubjects] = useState<string[]>(['MATH']);
  const [reassignPrimary, setReassignPrimary] = useState('MATH');
  const [subPlanId, setSubPlanId] = useState('STANDARD');
  const [actionError, setActionError] = useState<string | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Load Support Tickets
  const loadTickets = useCallback(async () => {
    setIsLoadingTickets(true);
    try {
      const data = await fetchAllSupportTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to load support tickets:', err);
    } finally {
      setIsLoadingTickets(false);
    }
  }, []);

  const handleUpdateTicketStatus = async (ticket: SupportTicket, newStatus: TicketStatus) => {
    setUpdatingTicketId(ticket.id);
    const note = ticketAdminNotes[ticket.id] ?? ticket.admin_notes ?? '';
    const res = await updateSupportTicketStatus({
      ticketId: ticket.id,
      status: newStatus,
      adminNotes: note,
      ticketNumber: ticket.ticket_number,
      userEmail: ticket.user_email,
      userName: ticket.user_name,
      subject: ticket.subject,
    });
    setUpdatingTicketId(null);
    if (res.success) {
      if (res.emailAlertTriggered) {
        setEmailAlertToast(
          `Automated Email Alert Dispatched: Notification sent to ${ticket.user_email} for Ticket #${ticket.ticket_number} (${newStatus})`
        );
        setTimeout(() => setEmailAlertToast(null), 7000);
      }
      loadTickets();
    }
  };

  // Route protection
  useEffect(() => {
    if (!authLoading && !isCustomerAdmin && !isSuperAdmin) {
      router.push('/');
    }
  }, [authLoading, isCustomerAdmin, isSuperAdmin, router]);

  // Load Metrics
  const loadMetrics = useCallback(async () => {
    try {
      setIsLoadingMetrics(true);
      const { data, error } = await supabase.rpc('admin_get_customer_metrics');
      if (!error && data) {
        setMetrics(data as MetricsData);
      }
    } catch (err) {
      console.warn('Failed to load customer metrics:', err);
    } finally {
      setIsLoadingMetrics(false);
    }
  }, []);

  // Load Users
  const loadUsers = useCallback(async () => {
    try {
      setIsLoadingUsers(true);
      const { data, error } = await supabase.rpc('admin_get_users_list', {
        p_page: page,
        p_limit: limit,
        p_search: search.trim() || null,
        p_status: statusFilter || null,
        p_role: roleFilter || null,
        p_board_id: boardFilter || null,
      });

      if (!error && data) {
        setUsers(data.users || []);
        setTotalUsers(Number(data.total) || 0);
      }
    } catch (err) {
      console.warn('Failed to load user list:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [page, limit, search, statusFilter, roleFilter, boardFilter]);

  useEffect(() => {
    if (isCustomerAdmin || isSuperAdmin) {
      loadMetrics();
      loadUsers();
      loadTickets();
    }
  }, [isCustomerAdmin, isSuperAdmin, loadMetrics, loadUsers, loadTickets]);

  // Handle User Status Update
  const handleUpdateStatus = async () => {
    if (!selectedUser || !actionReason.trim()) {
      setActionError('Reason is mandatory for auditing purposes.');
      return;
    }
    setIsProcessingAction(true);
    setActionError(null);

    const { error } = await supabase.rpc('admin_update_user_status', {
      p_target_user_id: selectedUser.user_id,
      p_new_status: newStatus,
      p_reason: actionReason.trim(),
    });

    if (error) {
      setActionError(error.message);
      setIsProcessingAction(false);
    } else {
      setIsProcessingAction(false);
      setModalAction(null);
      setActionReason('');
      loadUsers();
      loadMetrics();
    }
  };

  // Handle User Role Update
  const handleUpdateRole = async () => {
    if (!selectedUser || !actionReason.trim()) {
      setActionError('Reason is mandatory for auditing purposes.');
      return;
    }
    setIsProcessingAction(true);
    setActionError(null);

    const { error } = await supabase.rpc('admin_update_user_role', {
      p_target_user_id: selectedUser.user_id,
      p_new_role: newRole,
      p_reason: actionReason.trim(),
    });

    if (error) {
      setActionError(error.message);
      setIsProcessingAction(false);
    } else {
      setIsProcessingAction(false);
      setModalAction(null);
      setActionReason('');
      loadUsers();
      loadMetrics();
    }
  };

  // Handle Board Reassignment (Mode A vs Mode B)
  const handleReassignBoard = async () => {
    if (!selectedUser || !actionReason.trim()) {
      setActionError('Reason is mandatory for auditing purposes.');
      return;
    }
    setIsProcessingAction(true);
    setActionError(null);

    const payload = {
      p_target_user_id: selectedUser.user_id,
      p_new_board_id: reassignBoard,
      p_new_grade_level: reassignGrade,
      p_new_subject_ids: reassignMode === 'MODE_B' ? reassignSubjects : null,
      p_primary_subject_id: reassignMode === 'MODE_B' ? reassignPrimary : null,
      p_reason: actionReason.trim(),
    };

    const { error } = await supabase.rpc('admin_reassign_user_board', payload);

    if (error) {
      setActionError(error.message);
      setIsProcessingAction(false);
    } else {
      setIsProcessingAction(false);
      setModalAction(null);
      setActionReason('');
      loadUsers();
      loadMetrics();
    }
  };

  // Handle Subscription Assignment
  const handleAssignSubscription = async () => {
    if (!selectedUser || !actionReason.trim()) {
      setActionError('Reason is mandatory for auditing purposes.');
      return;
    }
    setIsProcessingAction(true);
    setActionError(null);

    const { error } = await supabase.rpc('admin_assign_user_subscription', {
      p_target_user_id: selectedUser.user_id,
      p_plan_id: subPlanId,
      p_ends_at: null,
      p_reason: actionReason.trim(),
    });

    if (error) {
      setActionError(error.message);
      setIsProcessingAction(false);
    } else {
      setIsProcessingAction(false);
      setModalAction(null);
      setActionReason('');
      loadUsers();
      loadMetrics();
    }
  };

  if (authLoading || (!isCustomerAdmin && !isSuperAdmin)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <RefreshCw className="w-6 h-6 text-sky-600 animate-spin" />
      </div>
    );
  }

  const totalPages = Math.ceil(totalUsers / limit) || 1;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-6 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight">Customer Administration</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {isSuperAdmin ? 'SUPER ADMIN' : 'CUSTOMER ADMIN'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-tenant customer reporting, user management, and subscription architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              Exit to Learning OS
            </button>
            <button
              onClick={() => {
                loadMetrics();
                loadUsers();
                loadTickets();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center gap-2 border-t border-slate-800/80 pt-4 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'metrics'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" /> Real Customer Reporting
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" /> User Management ({totalUsers})
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'tickets'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LifeBuoy className="w-4 h-4" /> Support Tickets ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" /> Audit Logs
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 space-y-6">
        {/* Automated Email Alert Dispatch Toast */}
        {emailAlertToast && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 flex items-center justify-between gap-3 shadow-xs animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-emerald-600 text-white rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">{emailAlertToast}</span>
            </div>
            <button
              onClick={() => setEmailAlertToast(null)}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
        {/* =================================================================== */}
        {/* TAB 1: METRICS & REPORTING (Zero Fabrication) */}
        {/* =================================================================== */}
        {activeTab === 'metrics' && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Accounts</div>
                <div className="text-xl font-black text-slate-900 mt-1">{metrics?.total_users ?? 0}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Active</div>
                <div className="text-xl font-black text-emerald-700 mt-1">{metrics?.active_users ?? 0}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Pending Verify</div>
                <div className="text-xl font-black text-amber-700 mt-1">{metrics?.pending_verification_users ?? 0}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Suspended</div>
                <div className="text-xl font-black text-rose-700 mt-1">{metrics?.suspended_users ?? 0}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deactivated</div>
                <div className="text-xl font-black text-slate-600 mt-1">{metrics?.deactivated_users ?? 0}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Onboarded</div>
                <div className="text-xl font-black text-sky-700 mt-1">{metrics?.onboarded_users ?? 0}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Onboarding Pend.</div>
                <div className="text-xl font-black text-purple-700 mt-1">{metrics?.pending_onboarding_users ?? 0}</div>
              </div>
            </div>

            {/* Distribution Breakdown Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Board Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Users by Educational Board</h3>
                <div className="space-y-2">
                  {Object.entries(metrics?.users_by_board || {}).map(([board, count]) => (
                    <div key={board} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                      <span className="font-semibold text-slate-700">{board}</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">{count}</span>
                    </div>
                  ))}
                  {Object.keys(metrics?.users_by_board || {}).length === 0 && (
                    <div className="text-xs text-slate-400 italic py-2">No board assignments recorded yet.</div>
                  )}
                </div>
              </div>

              {/* Grade Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Users by Grade Level</h3>
                <div className="space-y-2">
                  {Object.entries(metrics?.users_by_grade || {}).map(([grade, count]) => (
                    <div key={grade} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                      <span className="font-semibold text-slate-700">Class {grade}</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">{count}</span>
                    </div>
                  ))}
                  {Object.keys(metrics?.users_by_grade || {}).length === 0 && (
                    <div className="text-xs text-slate-400 italic py-2">No grade assignments recorded yet.</div>
                  )}
                </div>
              </div>

              {/* Primary Subject Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Users by Primary Subject</h3>
                <div className="space-y-2">
                  {Object.entries(metrics?.users_by_primary_subject || {}).map(([subj, count]) => (
                    <div key={subj} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                      <span className="font-semibold text-slate-700">{subj}</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">{count}</span>
                    </div>
                  ))}
                  {Object.keys(metrics?.users_by_primary_subject || {}).length === 0 && (
                    <div className="text-xs text-slate-400 italic py-2">No primary subjects chosen yet.</div>
                  )}
                </div>
              </div>

              {/* Top Institutions */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Top Institutions / Schools</h3>
                <div className="space-y-2">
                  {Object.entries(metrics?.users_by_institution || {}).map(([inst, count]) => (
                    <div key={inst} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                      <span className="font-semibold text-slate-700 truncate max-w-[200px]">{inst}</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">{count}</span>
                    </div>
                  ))}
                  {Object.keys(metrics?.users_by_institution || {}).length === 0 && (
                    <div className="text-xs text-slate-400 italic py-2">No institutions registered yet.</div>
                  )}
                </div>
              </div>

              {/* Top Locations */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Top Locations / Cities</h3>
                <div className="space-y-2">
                  {Object.entries(metrics?.users_by_location || {}).map(([loc, count]) => (
                    <div key={loc} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                      <span className="font-semibold text-slate-700 truncate max-w-[200px]">{loc}</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">{count}</span>
                    </div>
                  ))}
                  {Object.keys(metrics?.users_by_location || {}).length === 0 && (
                    <div className="text-xs text-slate-400 italic py-2">No locations registered yet.</div>
                  )}
                </div>
              </div>

              {/* Active Subscriptions by Plan */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Active Subscriptions by Plan</h3>
                <div className="space-y-2">
                  {Object.entries(metrics?.active_subscriptions_by_plan || {}).map(([plan, count]) => (
                    <div key={plan} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                      <span className="font-bold text-slate-800">{plan}</span>
                      <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">{count} active</span>
                    </div>
                  ))}
                  {Object.keys(metrics?.active_subscriptions_by_plan || {}).length === 0 && (
                    <div className="text-xs text-slate-400 italic py-2">No active subscriptions yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: USER MANAGEMENT (Paginated, Full Controls) */}
        {/* =================================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
              <div className="relative flex-grow min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by email, name, or school..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
              >
                <option value="">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING_VERIFICATION">Pending Verification</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="DEACTIVATED">Deactivated</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
              >
                <option value="">All Roles</option>
                <option value="STUDENT">Student</option>
                <option value="EDUCATOR">Educator</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>

              <select
                value={boardFilter}
                onChange={(e) => {
                  setBoardFilter(e.target.value);
                  setPage(1);
                }}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
              >
                <option value="">All Boards</option>
                <option value="CBSE">CBSE</option>
                <option value="CAMBRIDGE">Cambridge</option>
                <option value="IB_MYP">IB MYP</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role / Admin</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Curriculum</th>
                      <th className="py-3 px-4">Institution / Location</th>
                      <th className="py-3 px-4">Plan</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((u) => (
                      <tr key={u.user_id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{u.display_name || 'No Name'}</div>
                          <div className="text-[11px] text-slate-500">{u.email}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-slate-100 text-slate-800">
                              {u.role}
                            </span>
                            {u.is_customer_admin && (
                              <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-amber-50 text-amber-800 border border-amber-200">
                                Customer Admin
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            u.account_status === 'ACTIVE'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : u.account_status === 'SUSPENDED'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : u.account_status === 'PENDING_VERIFICATION'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {u.account_status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {u.onboarding_completed ? (
                            <div>
                              <div className="font-bold text-slate-900">{u.board_id} • Grade {u.grade_level}</div>
                              <div className="text-[11px] text-slate-500">Primary: {u.primary_subject || 'None'}</div>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">Pending Onboarding</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-slate-800 font-medium">{u.institution_name || '—'}</div>
                          <div className="text-[11px] text-slate-400">{u.location || '—'}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-800 bg-sky-50 px-2 py-0.5 rounded text-[10px] border border-sky-200">
                            {u.active_plan_id || 'FREE'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedUser(u);
                                setNewStatus(u.account_status);
                                setModalAction('status');
                              }}
                              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition"
                            >
                              Status
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(u);
                                setNewRole(u.role);
                                setModalAction('role');
                              }}
                              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition"
                            >
                              Role
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(u);
                                setReassignBoard(u.board_id || 'CBSE');
                                setReassignGrade(u.grade_level || 6);
                                setModalAction('reassign');
                              }}
                              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition"
                            >
                              Board
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(u);
                                setSubPlanId(u.active_plan_id || 'STANDARD');
                                setModalAction('subscription');
                              }}
                              className="px-2 py-1 rounded bg-sky-50 hover:bg-sky-100 text-sky-700 text-[11px] font-bold border border-sky-200 transition"
                            >
                              Plan
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                          No users matched the criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <div>
                  Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span> ({totalUsers} users)
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: AUDIT LOGS */}
        {/* =================================================================== */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 animate-fadeIn">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Recent Administrative Audit Trail
            </h3>
            <div className="divide-y divide-slate-100">
              {(metrics?.recent_admin_activity || []).map((log) => (
                <div key={log.audit_id} className="py-3 flex items-start justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {log.action_type}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">{log.target_resource}</span>
                    </div>
                    {log.reason && (
                      <p className="text-slate-600 mt-1 italic">&ldquo;{log.reason}&rdquo;</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0 text-[11px] text-slate-400">
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
              {(metrics?.recent_admin_activity || []).length === 0 && (
                <div className="py-8 text-center text-slate-400 italic">No audit records found.</div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: SUPPORT TICKETS & HELPDESK MANAGEMENT */}
        {/* =================================================================== */}
        {activeTab === 'tickets' && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Tickets</div>
                <div className="text-xl font-black text-slate-900 mt-1">{tickets.length}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Open / Pending</div>
                <div className="text-xl font-black text-amber-700 mt-1">
                  {tickets.filter((t) => t.status === 'OPEN').length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">In Progress</div>
                <div className="text-xl font-black text-sky-700 mt-1">
                  {tickets.filter((t) => t.status === 'IN_PROGRESS').length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Resolved / Closed</div>
                <div className="text-xl font-black text-emerald-700 mt-1">
                  {tickets.filter((t) => t.status === 'RESOLVED' || t.status === 'CLOSED').length}
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tickets by tracking #, email, or subject..."
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={ticketStatusFilter}
                  onChange={(e) => setTicketStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
                <button
                  onClick={loadTickets}
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                  title="Refresh Tickets"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingTickets ? 'animate-spin text-sky-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Support Tickets Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Ticket Info</th>
                      <th className="py-3 px-4">User Details</th>
                      <th className="py-3 px-4">Category / Priority</th>
                      <th className="py-3 px-4">Subject &amp; Message</th>
                      <th className="py-3 px-4">Status &amp; Action</th>
                      <th className="py-3 px-4">Admin Resolution Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {tickets
                      .filter((t) => {
                        const matchesStatus = !ticketStatusFilter || t.status === ticketStatusFilter;
                        const q = ticketSearch.toLowerCase();
                        const matchesSearch =
                          !q ||
                          t.ticket_number.toLowerCase().includes(q) ||
                          t.user_email.toLowerCase().includes(q) ||
                          t.subject.toLowerCase().includes(q) ||
                          t.message.toLowerCase().includes(q);
                        return matchesStatus && matchesSearch;
                      })
                      .map((t) => {
                        const isExpanded = expandedTicketId === t.id;
                        const isUpdating = updatingTicketId === t.id;

                        let statusBadge = 'bg-amber-50 text-amber-800 border-amber-200';
                        if (t.status === 'IN_PROGRESS') statusBadge = 'bg-sky-50 text-sky-800 border-sky-200';
                        if (t.status === 'RESOLVED') statusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                        if (t.status === 'CLOSED') statusBadge = 'bg-slate-100 text-slate-600 border-slate-200';

                        let priorityBadge = 'bg-slate-100 text-slate-700';
                        if (t.priority === 'HIGH') priorityBadge = 'bg-orange-100 text-orange-800';
                        if (t.priority === 'URGENT') priorityBadge = 'bg-rose-100 text-rose-800 font-bold';

                        return (
                          <tr key={t.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 px-4 align-top">
                              <span className="font-mono font-bold text-slate-900 block">
                                #{t.ticket_number}
                              </span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">
                                {new Date(t.created_at).toLocaleDateString()}
                              </span>
                            </td>

                            <td className="py-3 px-4 align-top">
                              <span className="font-semibold text-slate-800 block">{t.user_name}</span>
                              <span className="text-[11px] text-slate-500 font-mono block">{t.user_email}</span>
                            </td>

                            <td className="py-3 px-4 align-top">
                              <div className="space-y-1">
                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                  {t.category}
                                </span>
                                <div>
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${priorityBadge}`}>
                                    {t.priority}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-4 align-top max-w-xs">
                              <div className="font-semibold text-slate-900">{t.subject}</div>
                              <p className={`text-slate-600 mt-1 leading-relaxed ${isExpanded ? 'whitespace-pre-wrap' : 'line-clamp-2'}`}>
                                {t.message}
                              </p>
                              {t.message.length > 80 && (
                                <button
                                  onClick={() => setExpandedTicketId(isExpanded ? null : t.id)}
                                  className="text-[11px] font-bold text-sky-600 hover:text-sky-700 mt-1 cursor-pointer"
                                >
                                  {isExpanded ? 'Show less' : 'Read full message'}
                                </button>
                              )}
                            </td>

                            <td className="py-3 px-4 align-top">
                              <div className="space-y-2">
                                <select
                                  value={t.status}
                                  disabled={isUpdating}
                                  onChange={(e) => handleUpdateTicketStatus(t, e.target.value as TicketStatus)}
                                  className={`w-full px-2.5 py-1.5 rounded-lg border font-bold text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${statusBadge}`}
                                >
                                  <option value="OPEN">OPEN</option>
                                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                                  <option value="RESOLVED">RESOLVED (Auto Alert)</option>
                                  <option value="CLOSED">CLOSED (Auto Alert)</option>
                                </select>
                                {isUpdating && (
                                  <span className="text-[10px] text-sky-600 font-semibold flex items-center gap-1">
                                    <RefreshCw className="w-3 h-3 animate-spin" /> Syncing...
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-3 px-4 align-top">
                              <div className="space-y-1.5">
                                <textarea
                                  rows={2}
                                  placeholder="Resolution notes (included in email alert)..."
                                  value={
                                    ticketAdminNotes[t.id] !== undefined
                                      ? ticketAdminNotes[t.id]
                                      : t.admin_notes || ''
                                  }
                                  onChange={(e) =>
                                    setTicketAdminNotes({ ...ticketAdminNotes, [t.id]: e.target.value })
                                  }
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                />
                                <button
                                  onClick={() => handleUpdateTicketStatus(t, t.status)}
                                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-[10px] font-semibold transition cursor-pointer"
                                >
                                  Save Note
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                    {tickets.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-slate-400 italic">
                          No support tickets logged yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MODAL: ACTIONS (Status, Role, Board, Subscription) */}
        {/* =================================================================== */}
        {modalAction && selectedUser && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">
                  {modalAction === 'status' && 'Update Account Status'}
                  {modalAction === 'role' && 'Update User Role'}
                  {modalAction === 'reassign' && 'Reassign Educational Board'}
                  {modalAction === 'subscription' && 'Assign Subscription Plan'}
                </h3>
                <button
                  onClick={() => {
                    setModalAction(null);
                    setActionError(null);
                  }}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-slate-600">
                Target User: <span className="font-bold text-slate-900">{selectedUser.email}</span>
              </div>

              {actionError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <div>{actionError}</div>
                </div>
              )}

              {/* Status Modal */}
              {modalAction === 'status' && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase">New Account Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="ACTIVE" className="text-slate-900 bg-white">ACTIVE</option>
                    <option value="SUSPENDED" className="text-slate-900 bg-white">SUSPENDED</option>
                    <option value="DEACTIVATED" className="text-slate-900 bg-white">DEACTIVATED</option>
                  </select>
                </div>
              )}

              {/* Role Modal */}
              {modalAction === 'role' && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase">New Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="STUDENT" className="text-slate-900 bg-white">STUDENT</option>
                    <option value="EDUCATOR" className="text-slate-900 bg-white">EDUCATOR</option>
                    {isSuperAdmin && <option value="SUPER_ADMIN" className="text-slate-900 bg-white">SUPER_ADMIN</option>}
                  </select>
                </div>
              )}

              {/* Reassign Board Modal */}
              {modalAction === 'reassign' && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setReassignMode('MODE_A')}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition ${
                        reassignMode === 'MODE_A' ? 'bg-sky-50 border-sky-400 text-sky-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Mode A (Reset/Re-onboard)
                    </button>
                    <button
                      type="button"
                      onClick={() => setReassignMode('MODE_B')}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition ${
                        reassignMode === 'MODE_B' ? 'bg-sky-50 border-sky-400 text-sky-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Mode B (Immediate Assign)
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Board</label>
                      <select
                        value={reassignBoard}
                        onChange={(e) => setReassignBoard(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      >
                        <option value="CBSE" className="text-slate-900 bg-white">CBSE</option>
                        <option value="CAMBRIDGE" className="text-slate-900 bg-white">CAMBRIDGE</option>
                        <option value="IB_MYP" className="text-slate-900 bg-white">IB_MYP</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Grade</label>
                      <select
                        value={reassignGrade}
                        onChange={(e) => setReassignGrade(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      >
                        {[6, 7, 8, 9, 10].map((g) => (
                          <option key={g} value={g} className="text-slate-900 bg-white">Class {g}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription Modal */}
              {modalAction === 'subscription' && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase">Plan</label>
                  <select
                    value={subPlanId}
                    onChange={(e) => setSubPlanId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="FREE" className="text-slate-900 bg-white">FREE (Starter)</option>
                    <option value="STANDARD" className="text-slate-900 bg-white">STANDARD (Learner)</option>
                    <option value="PREMIUM" className="text-slate-900 bg-white">PREMIUM (Cognitive Mastery)</option>
                  </select>
                </div>
              )}

              {/* Mandatory Reason Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Reason for Audit Log *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. User request, compliance adjustment..."
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalAction(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isProcessingAction}
                  onClick={() => {
                    if (modalAction === 'status') handleUpdateStatus();
                    if (modalAction === 'role') handleUpdateRole();
                    if (modalAction === 'reassign') handleReassignBoard();
                    if (modalAction === 'subscription') handleAssignSubscription();
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white transition disabled:opacity-50"
                >
                  {isProcessingAction ? 'Processing...' : 'Confirm Mutation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
