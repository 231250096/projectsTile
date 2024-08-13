import React, {useCallback} from 'react';
import AddEventButton from './AddEventButton';

const EventBar = ({ events, setEvents, currentEvent, setCurrentEvent , email, uemail}) => {

  console.log('uemail', uemail)
  console.log('email in EventBar', email)

  const handleAdd = useCallback(() => {
    console.log('uemail', uemail)
    console.log('email', email)
    if(uemail != email){
      alert('不允许添加他人的项目')
      return
    }
    const title = prompt('项目名称:');
    // Prevent Duplicated
    if (
      events.find((event) => event.title.toLowerCase() === title.toLowerCase())
    ) {
      alert('项目已存在');
      return;
    }
    // Add new event
    if (title)
      setEvents((prev) => [
        ...prev,
        {
          title,
          ['To do']: [],
          ['In progress']: [],
          ['Completed']: [],
        },
      ]);
  }, [events, setEvents]);

  return (
    <div className='event-bar'>
      <h1 className='event-bar-title'>项目</h1>
      <AddEventButton handleClick={handleAdd} />
      <div className='event-container'>
        {events.map((item) => (
          <div
            key={item.title}
            className={`event over-hide ${currentEvent.title === item.title ? 'selected-event' : ''
              }`}
            onClick={() => setCurrentEvent(item)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventBar;
