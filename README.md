SocketChat is a Real Time Chat App
It is a MERN stack full-stack application that implements a real-time chat feature using Socket.IO. It also utilizes Tailwind CSS for modern design.


Real-time Chat: Powered by Socket.IO for real-time communication between users.
MERN Stack: Built with MongoDB, Express, React, and Node.js.
Tailwind CSS: Designed with the utility-first CSS framework Tailwind.



Installation
1.Clone this repository:git clone https://github.com/SajaHamade/RealTimeChatApp.git

2.Navigate to the chatServer directory and install the server dependencies:
cd chatServer
npm install

3.Navigate to the chatFront directory and install the frontend dependencies:
cd chatFront
npm install


4.Configure environment variables for the backend:
Create a .env file in the chatServer directory and add your database URL and PORT number and your JWT_KEY .

5.Run the backend server:
cd chatServer
npm start ;
for a successful run you must see on your console  : 
Server is Running
Connected to mongodb
user joined (then the socket id)


6:Run the frontend:
cd chatFront
npm run dev ;(made with vite)
and then ctrl+click on the provided link .
