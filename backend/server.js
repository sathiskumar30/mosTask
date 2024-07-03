const express = require('express')
const mysql = require('mysql')
const bodypaser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(bodypaser.json())
app.use(cors())


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password:'password',
  database: 'sathis'
})

db.connect(err => {
  if (err) {
    console.log(err)
    throw err
  }
  console.log('database connected successfully')
})


app.post('/api/users', async (req, res) => {
  try {
    const { name, age, mobile } = req.body

    const sql = 'INSERT INTO `UserData` (`name`, `age`, `mobile`) VALUES (?,?,?)';

    db.query(sql, [name, age, mobile], (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.send(result)
    })

  } catch (e) {
    console.log(e)
    return res.status(500).send('Something went wrong')
  }

})

app.get('/api/users', async (req, res) => {
  try {
    const sql = 'SELECT * FROM UserData';

    db.query(sql, (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });

  } catch (err) {
    console.log(err)
    return res.status(500).send('Something went wrong')
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const sql = 'DELETE FROM UserData WHERE `UserData`.`id` = ?';

    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('User deleted!');
    });
  } catch (err){
    console.log(err)
    return res.status(500).send('Something went wrong')
  }
  });


// app.get('/api/users/:id', async(req, res) => {
//   const { id } = req.params;
//   console.log(id)
//   const sql = 'SELECT * FROM `UserData` WHERE `id` = ?';
//   db.query(sql, [id], (err, result) => {
//     if (err) return res.status(500).send(err);
//     res.send(result);
//     console.log(result)
//   });
// });


app.put('/api/users/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const { name, age, mobile } = req.body;
    console.log({ name, age, mobile })
    const sql = 'UPDATE `UserData` SET `name` = ?, `age` = ?, `mobile` = ? WHERE id = ?';
    db.query(sql, [name, age, mobile, id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('User updated!');
      //   res,send(result)
    });
  }catch(err){
    console.log(err)
    return res.status(500).send('Something went wrong')
  }
});



port = 5000
app.listen(port, () => {
  console.log(`the server is running on the port ${port} successfully`)
})