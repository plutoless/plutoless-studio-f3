<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Post extends Controller {

    
    function beforeroute() {
    }
    
    //! HTTP route post-processor
    function afterroute() {
        // Render HTML layout
        echo Template::instance()->render('post_view.php');
    }
    
    function view($f3, $args) {
        $db=$this->db;
        $f3->set('posts', $db->exec('SELECT posts.tid, posts.title, posts.text AS content, 
            posts.author, posts.ts, types.text AS type FROM 
            posts LEFT JOIN types ON posts.tid=types.tid ORDER BY ts'));
        
    }
    
    function error($f3) {
        $log=new Log('error.log');
        $log->write($f3->get('ERROR.text'));
    }
}