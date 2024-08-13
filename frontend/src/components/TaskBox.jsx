import React, { useCallback } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent, email, uemail}) => {
  console.log('email in TaskBox',email)
  const handleRemove = useCallback(() => {
    if(uemail != email){
      alert('不允许删除他人项目')
      return
    }
    if (confirm('确定要删除这个项目吗？')) {
      // update events
      setEvents((prev) => {
        const result = prev.filter((item) => item.title != currentEvent.title);
        // if event is empty
        if (!result.length) {
          // init the event
          const initEvent = [
            {
              title: 'Add a new Event',
              ['To do']: [],
              ['In progress']: [],
              ['Completed']: [],
            },
          ];
          setEvents(initEvent);
        } else {
          // set the first event as current
          setCurrentEvent(result[0]);
        }
        return result;
      });
    }
  }, [events, setEvents, currentEvent, setCurrentEvent]);

  const handleDragEnd = useCallback((result) => {
    if(uemail != email){
      alert('不允许更改他人任务状态')
      return
    }
    console.log('result',result)
    if (!result.destination) return;
    const { source, destination } = result;
    const curEvent = events.find((item) => item.title === currentEvent.title);
    const taskCopy = curEvent[source.droppableId][source.index];
    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          let eventCopy = { ...event };
          // Remove from source
          const taskListSource = event[source.droppableId];
          taskListSource.splice(source.index, 1);
          eventCopy = { ...event, [source.droppableId]: taskListSource };
          // Add to destination
          const taskListDes = event[destination.droppableId];
          taskListDes.splice(destination.index, 0, taskCopy);
          eventCopy = { ...event, [destination.droppableId]: taskListDes };
          return eventCopy;
        } else {
          return event;
        }
      })
    );
  }, [events, setEvents, currentEvent]);

  const handleBack = useCallback(() => {
      window.location.href = '/LogIn.html'
  },[email]);

  const handleAll = useCallback(() => {
    window.location.href = `/index.html?email=${uemail}`
},[email]);

//   const handleBack = useCallback(() => {
//     window.location.href = 'http://192.168.56.1:8080/LogIn.html'
// },[email]);

  return (
    <div className='task-box'>
      <header className='task-box-header'>
        <h1 className='task-box-title'>所有任务</h1>
        <button className='remove-button' onClick={handleRemove}>
          删除这个项目
        </button>
        <button className='back-button' onClick={handleBack}>登陆/退出</button>
        <button className='all-button' onClick={handleAll}>项目大厅</button>
      </header>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div className='task-box-body'>
          {
            ['To do', 'In progress', 'Completed'].map(tag => (
              <Column
                key={tag}
                tag={tag}
                events={events}
                setEvents={setEvents}
                currentEvent={currentEvent}
                uemail = {uemail}
                email={email}
              />
            ))
          }
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBox;
