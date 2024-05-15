import requests

url = 'http://127.0.0.1:8000/api/generate-code'
headers = {
    'Content-Type': 'application/json',
}
data = {
    'auth_code': 'wad1awdadwaoiwdjawd8989116231a6wd#$@%#@$@dwada8'
}

ls = []

for i in range(10):
    response = requests.post(url, json=data, headers=headers)
    ls.append(response.json())
print(ls)