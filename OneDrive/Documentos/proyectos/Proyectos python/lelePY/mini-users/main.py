import json

def load_users():
    with open("users.json", "r") as f:
        users = json.load(f)
    return users

"""
print("Program started")

users_data = load_users()
print(users_data)

username = input("Enter your username: ")
password = input("Enter your password: ")

if username in users_data:
    print("Usuario ya existe")
else:
    users_data[username] = password

print(users_data)

with open("users.json", "w") as f:
    json.dump(users_data, f)
print("users.json saved:", users_data)


#login code
username = input("Enter your username: ")
password = input("Enter your password: ")
if username in users_data:

    if users_data[username] == password:
        print("Login successful")
    else:        print("Incorrect password")
else:    print("Username not found")

"""


#console like menu code
users_data = load_users()
while True:
    print("1. register")
    print("2. login")
    print("3. exit")

    choise = input("Enter your choise: ")


#register code in menu
    if choise == "1":
        username = input("Enter your username: ")
        password = input("Enter your password: ")

        if username in users_data:
            print("Usuario ya existe")
        else:
            users_data[username] = password
            with open("users.json", "w") as f:
                json.dump(users_data, f)
            print("users.json saved:", users_data)


#login code in menu
    elif choise == "2":
        username = input("Enter your username: ")
        password = input("Enter your password: ")
        if username in users_data:

            if users_data[username] == password:
                print("Login successful")
            else:        print("Incorrect password")
        else:    print("Username not found")


#exit
    elif choise == "3":
        print("Exiting program")
        break