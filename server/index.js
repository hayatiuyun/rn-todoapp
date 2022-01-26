const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const db = require('./models/');
app.use(bodyParser.json());
/* success function */
function success(res, payload) {
  console.log(payload);
  return res.status(200).json(payload);
}

app.get('/ToDo', async (req, res, next) => {
  try {
    const ToDo = await db.Todo.find({});
    return success(res, ToDo);
  } catch (err) {
    next({status: 400, message: 'failed to get ToDo'});
  }
});
app.get('/ToDo/:page', function (req, res, next) {
  console.log(req.params.page);
  var perPage = 9;
  var page = req.params.page || 1;

  try {
    db.Todo.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function (_err, todo) {
        db.Todo.count().exec(function (error, count) {
          return success(res, {
            todo: todo,
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });
  } catch (error) {
    next({status: 400, message: 'Failed to load more because ' + error});
  }
});
app.post('/ToDo', async (req, res, next) => {
  console.log(req.body);
  try {
    const todo = await db.Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({status: 400, message: 'failed to create todo'});
  }
});

app.put('/ToDo/:id', async (req, res, next) => {
  console.log(req.body);
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, todo);
  } catch (err) {
    next({status: 400, message: 'failed to update todo'});
  }
});
app.delete('/ToDo/:id', async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id);
    return success(res, 'todo deleted!');
  } catch (err) {
    next({status: 400, message: 'failed to delete todo'});
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || 'there was an error processing request',
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
