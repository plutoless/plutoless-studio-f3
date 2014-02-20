<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller {
    protected $db;
    
    function __construct() {
        $f3=Base::instance();
        $db=new DB\SQL(
                $f3->get('db'),
                $f3->get('db_user'),
                $f3->get('db_pass')
                );
        if (file_exists('setup.sql')) {
            $db->exec(explode(';', $f3->read('setup.sql')));
            rename('setup.sql', 'setup.$ql');
        }
        new DB\SQL\Session($db);
        $this->db=$db;
        
    }
}