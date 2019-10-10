const express = require('express');

const router = express.Router();
const db = require('../models/db');
const validate = require('../middlewave/userValidate')
//const userController = require('../controllers/userController');

router.get('/get-user',(req, res)=>{
    const query = `
        select * from  public.tbl_profile_user
    `
    db.postgre
        .run(query)
        .then((rs)=>{
            return res.status(200).json({
                code: 0,
                data: rs.rows
            })
        })
        .catch(()=>{
            return res.status(500).json({
                code: 1,
                data: []
            })
        })
})
router.post('/signin',validate.signIn, (req, res)=>{
    const {user_name, user_cmnd, user_phone, user_address, user_mail, user_password, user_username} = req.body
    const query = `
        INSERT INTO public.tbl_profile_user(
                                            user_name, 
                                            user_cmnd, 
                                            user_phone, 
                                            user_address, 
                                            user_mail, 
                                            user_password,
                                            user_username
                                           
                                            )
                                    VALUES (
                                            '${user_name ? user_name : null}',
                                            '${user_cmnd}',
                                            '${user_phone ? user_phone : null}',
                                            '${user_address ? user_address : null}',
                                            '${user_mail ? user_mail : null}',
                                            '${user_password}',
                                            '${user_username}'
                                           
                                    ) ;
                                    `
    db.postgre
        .run(query)
        .then((rs)=>{
            if(rs.rows.lenght === 0){
                 return res.status(200).json({
                    code: 2
                })
            }
            return res.status(200).json({
                code: 0
            })
        })
        .catch(()=>{
            return res.status(500).json({
                code: 1
            })
        })
})
router.post('/login', validate.loginValidate, (req, res)=>{
    
    const { username, password} = req.body
    const query = `
            select u2.permission_name from tbl_permission_user u1
            left join tbl_profile_user u2
            on  u1.user_cmnd = u2.user_cmnd

            where u1.user_username = '${username}' and u1.user_password = '${password}'
    `
    //const query = 'SELECT * FROM tbl_permission_user  '

    db.postgre
        .run(query)
        .then((rs)=>{
            const result = rs.rows[0]
            res.status(200).json({
                code: 0,
                data: result
            })
        })
        .catch(()=>{
            res.status(500).json({
                code: 1
            })
        })
})



module.exports = router;

