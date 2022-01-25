const express = require('express');
const pool = require('../settings/db');
const router = express.Router();

router.get('/addtours',(req, res)=> {
    res.render('tours/addtours');
    });

    router.get('/tours',  async(req, res)=> {
        const tours = await pool.query('SELECT * FROM tours');
        //console.log(reservation);
        res.render('tours/tours', {tours});
    });

     
    router.post('/addtours', async(req, res)=> {
    const {name_tour} = req.body;
    const newTours = {
        name_tour
    };
    //console.log(newReservation);
    await pool.query('INSERT INTO tours set ?', [newTours]);
    req.flash('success', 'Tours saved successfully');
    res.redirect('/tours');
    });

    router.get('/edit_tours/:id_tour', async(req, res)=> {
        const {id_tour} = req.params;
        const edit_tours = await pool.query('SELECT * FROM tours WHERE id_tour = ?', [id_tour]);
        //console.log(edit_reservation[0])
        res.render('tours/edit_tours', {edit_tours: edit_tours[0]});
     });

     router.post('/edit_tours/:id_tours',async(req, res)=> {
        const { id_tours } = req.params;
        const {name} = req.body;
        const newTours = {
        name
          };
        //console.log( id_reservation );   
        await pool.query('UPDATE tours set ? WHERE id_tours = ?', [newTours, id_tours]); 
        
        //console.log(newReservation);
        req.flash('success', 'Reserva editada Exitosamente');
        res.redirect('/tours');
        //res.send('actualizado')
    });    

    router.get('/delete_tours/:id_tours', async(req, res)=> {
        const {id_tours} = req.params;
        validationtours = await pool.query('SELECT * FROM reservation WHERE id_tour = ?', [id_tours]);
        //console.log(validationtours);
        if (validationtours.length > 0){
            req.flash('success', 'Tour se esta utilizando en algunas reservas');
            res.redirect('/tours');
        } else{
        await pool.query('DELETE FROM tours WHERE id_tour = ?', [id_tours]);
        req.flash('success', 'Tour eliminado exitosamente');
        res.redirect('/tours');
        }
     });

    module.exports = router;