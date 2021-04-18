<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\WordsModel;
use Validator;

class wordsController extends Controller
{   //Возвращаем все обьекты
    public function words(){
        return response()->json(WordsModel::get(), 200);
    }
    //Ищем обьект по id и выводим его
    public function wordsById($id){
        //Ищем в таблице обьект с нужным id
        $word = WordsModel::find($id);
        //Если обьект не найден возвращаем ошибку
        if(is_null($word)){
            return response()->json(['error' => true, 'message' => 'Id not found'], 404);
        }
        //Если найден возвращаем обьект
        return response()->json($word, 200);
    }
    public function wordsCreate(Request $request){
        //Создаем массив с правилами для валидации
        $rules = [
            'name'=>'required|min:2|max:20',
            'name_en'=>'required|min:2|max:20'
        ];
        //На основе правил производим проверку и записываем в переменную результат
        $validator = Validator::make($request-> all(), $rules);
        //Если данные не валидны тогда выкидываем ошибку
        if($validator->fails()){
             return response()-> json(['error' => true, 'message' => $validator->errors()], 400);
        }
        //Если валидные то создаем обьект и возвращаем его
        $words = WordsModel::create($request->all());
        return response()->json($words, 200);
    }
    public function wordsUpdate(Request $request, $id){
        // Ищем обьект по id
        $word = WordsModel::find($id);
         //Если обьект не найден возвращаем ошибку
        if(is_null($word)){
            return response()->json(['error' => true, 'message' => 'Id not found'], 404);
        }
        //Если id найден делаем валидацию входящих данных 
        //Создаем массив с правилами для валидации
        $rules = [
            'name'=>'required|min:2|max:20',
            'name_en'=>'required|min:2|max:20'
        ];
        //На основе правил производим проверку и записываем в переменную результат
        $validator = Validator::make($request-> all(), $rules);
        //Если данные не валидны тогда выкидываем ошибку
        if($validator->fails()){
             return response()-> json(['error' => true, 'message' => $validator->errors()], 400);
        }
        //Если все успешно то тогда обновляем обьект и возвращаем его
        $word -> update($request -> all());
        return response()-> json($word, 201); 
    }
    public function wordsDelete($id){
        // Ищем обьект по id
        $word = WordsModel::find($id);
         //Если обьект не найден возвращаем ошибку
        if(is_null($word)){
            return response()->json(['error' => true, 'message' => 'Id not found'], 404);
        }
        //Если id найден удаляем обьект 
        $word -> delete();
        return response()-> json('', 204); 
    }

    public function wordsByRus($name){
        $projects = WordsModel::where('name', $name)->get();
        return response()->json($projects, 200);
    }
}
