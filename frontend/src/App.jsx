import './App.css';
import './components/event.css';
import './components/task.css';
import React, { useState, useEffect, useCallback } from 'react';
import EventBar from './components/EventBar';
import TaskBox from './components/TaskBox';
import axios from 'axios'; 

function App() {
  const url = new URL(window.location.href);
  console.log('url', url)
  const uid = url.searchParams.get('id');

  let uemail = url.searchParams.get('email');
  console.log('uemail', uemail)

  const [user, setUser] = useState(null);
  const[email, setEmail] = useState(null)
  const initEvents = {
    title: '第一个项目',
    ['To do']: [],
    ['In progress']: [],
    ['Completed']: [],
  }
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:7001/api/user/${uid}`);
        setUser(response.data.user);
        setEvents(response.data.user.events); // 从后端获取 `events`
        console.log('user in App',response.data.user)
        setEmail(response.data.user.email)
        console.log('email in App', email)
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid]);

  if(uemail == null){
    uemail = email
  }
  console.log('uemail', uemail)
  console.log('email', email)
  console.log(user)
  console.log(events)
  console.log('events[0]',events[0])

  const [currentEvent, setCurrentEvent] = useState(initEvents);
  console.log(currentEvent)

  useEffect(() => {
    const updateEvents = async () => {
    try {
      // 更新本地状态
      console.log('!!!')
      // 将更新后的 events 发送到后端
      await axios.put(`http://127.0.0.1:7001/api/updateEvents/${uid}`, { events: events });
    } catch (e) {
      console.error('Failed to update events!', e);
    }
  }
  if (uid) {
    updateEvents();
  }}, [events]);

  console.log('currentEvent', currentEvent)
console.log('events', events)
  return (
    <div className='App'>
      <EventBar
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        email={email}
        uemail={uemail}
      />
      <TaskBox
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        email={email}
        uemail={uemail}
      />
    </div>
  );
}

export default App;
