import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { TextField } from '../../shared/FormFields';

const useStyles = makeStyles({
  card: {
    margin: '1rem',
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    flexGrow: 1,
  },
  standardSpace: {
    margin: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState(toDoList.todos);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveToDoList(toDoList.id, { todos });
  };

  const handleText = (event, index) => {
    setTodos([
      // immutable update
      ...todos.slice(0, index),
      Object.assign({}, todos[index], { text: event.target.value }),
      ...todos.slice(index + 1),
    ]);
  };

  const handleDate = (event, index) => {
    setTodos([
      // immutable update
      ...todos.slice(0, index),
      Object.assign({}, todos[index], { date: event.target.value }),
      ...todos.slice(index + 1),
    ]);
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{toDoList.title}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant="h6">
                {index + 1}
              </Typography>
              <TextField
                label="What to do?"
                value={todo.text}
                onChange={(event) => handleText(event, index)}
                className={classes.textField}
              />
              <TextField
                label="When?"
                value={todo.date}
                onChange={(event) => handleDate(event, index)}
                className={classes.textField}
              />
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ]);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setTodos([...todos, '']);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
