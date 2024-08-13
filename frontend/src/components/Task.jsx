import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Task = ({
  name,
  details,
  id,
  comment,
  provided,
  handleUpdate,
  handleRemove, 
  handleComment, // 添加这一行
}) => {
  const [filepath, setFilepath] = useState(null);
  const [fileInput, setFileInput] = useState(null); // 用于处理文件选择

  // 从后端获取文件路径
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:7001/api/getFile/${id}`);
      if (response.data.file.filepath !== '0') {
        setFilepath(response.data.file.filepath);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserData();
    }
  }, [id]);

  // 处理文件选择事件
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`http://127.0.0.1:7001/api/uploadFile/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data) {
          console.log('文件上传成功', response.data);
          setFilepath(response.data.fileURL);
        } else {
          console.error('文件上传失败', response.data.message);
        }
      } catch (error) {
        console.error('上传文件时出错', error);
      }
    }
  };
  console.log('comments in Task', comment)
  console.log('name in Task', name)

  return (
    <div
      className='task'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <h2 className='task-name over-hide'>{name}</h2>
      <p className='task-details'>事项：{details}</p>
      <p className='task-comment'>评论:</p>
      <p></p>
      <p className='task-comment'>{comment}</p>
      <div className='remove-bar' onClick={(e) => handleRemove(id, e)}>
        删除
      </div>

      <div className='update-bar' onClick={(e) => handleUpdate(id)}>
        更改
      </div>

      <div className='comments-bar' onClick={(e) => handleComment(id)}>
        评论
      </div>

      {filepath && (
        <div className='file-link'>
          <a href={filepath} target="_blank" rel="noopener noreferrer">查看附件</a>
        </div>
      )}

      <input
        type="file"
        id={`file-upload-${id}`}
        style={{ display: 'none' }} // 隐藏文件选择按钮
        onChange={handleFileChange}
        ref={(input) => setFileInput(input)} // 获取文件选择按钮的引用
      />
      
      <button
        type="button"
        onClick={() => fileInput && fileInput.click()} // 触发文件选择对话框
        style={{
          position: 'absolute',
          top: '10px',
          left: '180px',
          padding: '5px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        上传附件
      </button>
    </div>
  );
};

export default Task;
