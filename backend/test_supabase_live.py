import os
import sys
import json
import urllib.request
import urllib.error

url = "https://gyjlrgudysqabwbhaskr.supabase.co/rest/v1/"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amxyZ3VkeXNxYWJ3Ymhhc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTI1ODUsImV4cCI6MjEwNDk4ODU4NX0.N_SDVcl0PoN39n9sHApC_nEy8fI0xRqhj3IFvG6zbeI"

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json"
}

print(f"Connecting to: {url}")
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        print(f"Status Code: {resp.status}")
        data = json.loads(resp.read().decode("utf-8"))
        print(f"Definitions / Tables in Supabase: {list(data.get('definitions', {}).keys())}")
        if data:
            print("First row sample:")
            print(json.dumps(data[0], indent=2))
        else:
            print("Table exists but is empty.")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(e.read().decode("utf-8"))
except Exception as ex:
    print(f"Error: {ex}")
