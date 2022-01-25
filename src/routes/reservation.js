const express = require('express');
const pool = require('../settings/db');
const router = express.Router();
const {} = require('../lib/handlebars');


const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, async (req, res)=> {
    const tours = await pool.query('SELECT * FROM tours ');
    res.render('reservation/form_reservation', {tours});
});

router.get('/prueba',async (req, res)=> {
    //const reservation = await pool.query('SELECT * FROM reservation WHERE id_user = ?', [req.user.id_user] );
   const tours = await pool.query('SELECT * FROM tours ');
   const reservation = await pool.query('select * from reservation inner join tours on (tours.id_tour = reservation.id_tour) where name?reservation LIKE %jo%');
   //console.log(reservation);
   res.render('reservation/list_reservation', {reservation,tours});
});

router.post('/add', isLoggedIn, async(req, res)=> {
    const {date_reservation,day_reservation =  new Date(), id_tour, name_reservation, phone, num_of_adults, num_of_children, transfer} = req.body;
    const newReservation = {
        date_reservation,
        day_reservation,
        id_tour,
        name_reservation,
        phone,
        num_of_adults,
        num_of_children,
        transfer,
        id_user: req.user.id_user
    };
    console.log(newReservation);
    await pool.query('INSERT INTO reservation set ?', [newReservation]);
    req.flash('success', 'reservation saved successfully');
    res.redirect('/reservation');
});

router.get('/reservation', isLoggedIn, async(req, res)=> {
   //const reservation = await pool.query('SELECT * FROM reservation WHERE id_user = ?', [req.user.id_user] );
   const tours = await pool.query('SELECT * FROM tours ');
   const reservation = await pool.query('select * from reservation inner join tours on (tours.id_tour = reservation.id_tour)');
   //console.log(reservation);
   res.render('reservation/list_reservation', {reservation,tours});
});

router.get('/delete/:id_reservation', isLoggedIn, async(req, res)=> {
    const {id_reservation} = req.params;
    await pool.query('DELETE FROM reservation WHERE id_reservation = ?', [id_reservation]);
    req.flash('success', 'Reserva eliminada exitosamente');
    res.redirect('/reservation');
 });

 router.get('/edit/:id_reservation',isLoggedIn, async(req, res)=> {
    const {id_reservation} = req.params;
    const edit_reservation = await pool.query('SELECT * FROM reservation WHERE id_reservation = ?', [id_reservation]);
    //console.log(edit_reservation[0])
    res.render('reservation/edit_reservation', {edit_reservation: edit_reservation[0]});
 });

    router.post('/edit/:id_reservation',isLoggedIn, async(req, res)=> {
        const { id_reservation } = req.params;
        const {date_reservation,day_reservation =  new Date(), id_tour, name_reservation, phone, num_of_adults, num_of_children, transfer} = req.body;
        const newReservation = {
            date_reservation,
            day_reservation,
            id_tour,
            name_reservation,
            phone,
            num_of_adults,
            num_of_children,
            transfer
        };
        //console.log( id_reservation );   
        await pool.query('UPDATE reservation set ? WHERE id_reservation = ?', [newReservation, id_reservation]); 
        
        //console.log(newReservation);
        req.flash('success', 'Reserva editada Exitosamente');
        res.redirect('/reservation');
        //res.send('actualizado')
    });


module.exports = router;