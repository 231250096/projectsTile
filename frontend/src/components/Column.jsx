import { useState } from 'react';
import AddTaskButton from './AddTaskButton';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';

const Column = ({ tag, currentEvent, events, setEvents, uemail, email}) => {
  console.log(email)
  const handleAdd = () => {
    if(uemail != email){
      alert('不允许添加他人任务')
      return
    }
    const name = prompt('任务名称:');
    const details = prompt('任务事项:');
    if (!(name && details)) return;
    setEvents((prev) => {
      const arrCopy = [...prev];
      const index = prev.findIndex(
        (event) => event.title === currentEvent.title
      );
      const eventCopy = arrCopy[index];
      // Remove old and add the latest data
      arrCopy.splice(index, 1, {
        ...eventCopy,
        [tag]: [
          ...eventCopy[tag],
          { name: name, id: uuid(), details: details },
        ],
      });
      return arrCopy;
    });
  };

  const handleRemove = (id, e) => {
    if(uemail != email){
      alert('不允许删除他人任务')
      return
    }
    // 禁止冒泡到上层:修改task
    e.stopPropagation();
    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          const taskList = event[tag];
          const index = taskList.findIndex((item) => item.id === id);
          taskList.splice(index, 1);
          return { ...event, [tag]: [...taskList] };
        } else {
          return event;
        }
      })
    );
  };

  const handleUpdate = (id) => {
    if(uemail != email){
      alert('不允许更改他人任务内容')
      return
    }
    const name = prompt('更改任务名称:');
    const details = prompt('更改任务事项:');
    if (!(name && details)) return;
    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          const taskList = event[tag];
          const index = taskList.findIndex((item) => item.id === id);
          const updatedTask = {
            ...taskList[index],
            name,
            details,
          };
          taskList.splice(index, 1);
          return { ...event, [tag]: [...taskList, updatedTask] };
        } else {
          return event;
        }
      })
    );
  };

  const handleComment = (id) => {
    let comment = '[  ' + uemail + ': ' + prompt('任务评论') + '  ]  ';
    if (!comment) return;
    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          const taskList = event[tag];
          const index = taskList.findIndex((item) => item.id === id);
          console.log('task', taskList[index].comment)
          if(taskList[index].comment != undefined){
          comment = comment + taskList[index].comment}
          const updatedTask = {
            ...taskList[index],
            comment
          };
          taskList.splice(index, 1);
          return { ...event, [tag]: [...taskList, updatedTask] };
        } else {
          return event;
        }
      })
    );
  };

  return (
    <div className='column'>
      {tag}
      <AddTaskButton handleClick={handleAdd} />
      <Droppable droppableId={tag}>
        {(provided, snapshot) => {
          return (
            <div
              className='task-container'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {events
                .find((event) => event.title === currentEvent.title)
                ?.[tag].map((item, index) => (
                  console.log('item', item),
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                          <Task
                            name={item.name}
                            details={item.details}
                            id={item.id}
                            comment={item.comment}
                            provided={provided}
                            snapshot={snapshot}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
                            handleComment={handleComment}
                          />
                        )}
                    </Draggable>
                  ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Column;
