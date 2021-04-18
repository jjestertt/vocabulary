<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class wordsModel extends Model
{
    //Указываем имя таблицы
    protected $table = 'words';
    //Запрещаем Laravel устанавливать стандартные поля
    public $timestamps = false;
    //Указываем на заполняемые строки в таблице
    protected $fillable = [
        'id',
        'name',
        'name_en'
    ];
}
