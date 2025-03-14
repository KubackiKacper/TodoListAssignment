'use client';
import React, { useEffect, useState } from 'react';
import styles from './ToDoForm.module.css';
import ToDoList, { ToDoProps } from './ToDoList';
import apiUrls from '@/urlList';
import notify, { TypeEnum } from './notify';

interface IToDoFormProps {
  description: string;
}

export interface IToDoActions {
  items: ToDoProps[];
  onDelete: (id: number) => void;
  onEdit: (items: ToDoProps) => void;
}
const ToDoForm = () => {
  const [noteValue, setNoteValue] = useState<IToDoFormProps>({
    description: '',
  });
  const [toDoItems, settoDoItems] = useState<ToDoProps[]>([]);

  const fetchToDoItems = async () => {
    try {
      const response = await fetch(`${apiUrls.toDoApiUrl.urlLink}`, {
        method: 'GET',
      });
      const data = await response.json();
      settoDoItems(data);
      
    } 
    catch (error) {
      notify({
        type: TypeEnum.error,
        message: 'Something went wrong, could not fetch data!',
      });
    }
  };
  const handleEdit = async (item: ToDoProps) => {
    if (!item) return;

    try {
      const response = await fetch(`${apiUrls.toDoApiUrl.urlLink}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          description: item.description, 
          completionStatus:item.completionStatus 
        }),
      });

      if (response.ok) {
        notify({ 
          type: TypeEnum.info, 
          message: 'Task updated successfully!' 
        });
        fetchToDoItems();
      } else {
        notify({ 
          type: TypeEnum.error, 
          message: 'Could not update the item.' 
        });
      }
    } catch (error) {
      notify({ 
        type: TypeEnum.error, 
        message: "Something went wrong, could not update item!"  
      });
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${apiUrls.toDoApiUrl.urlLink}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        notify({ 
          type: TypeEnum.warn, 
          message: 'Item deleted successfully!' 
        });
        fetchToDoItems();
      } 
      else {
        notify({ 
          type: TypeEnum.error, 
          message: 'Could not delete the item.' 
        });
      }
    } 
    catch (error) {
      notify({ 
        type: 
        TypeEnum.error, 
        message: "Something went wrong, could not delete item!" 
      });
    }
  };

  const handleSubmit = () => {
    try {
      fetch(`${apiUrls.toDoApiUrl.urlLink}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteValue),
      }).then(async () => {
        notify({ 
          type: TypeEnum.success, 
          message: 'Task added successfully!' 
        });
        fetchToDoItems();
      });
    } catch (error) {
      notify({ 
        type: TypeEnum.error, 
        message: "Something went wrong, could not add item!" 
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteValue({ ...noteValue, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchToDoItems();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.centered}>
        Add Task
        <div className={styles.input}>
          <input
            required
            type="text"
            name="description"
            onChange={handleChange}
            maxLength={255}
          ></input>
          <button type="submit" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
        <div
          className={styles.overflowDiv}
          style={{ overflow: 'auto', marginTop: '10px' }}
        >
          <ToDoList
            items={toDoItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ToDoForm;
