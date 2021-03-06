<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|string|max:45',
            'name' => 'required|string|max:45',
            'us_apellidopat' => 'required|string|max:45',
            // 'us_extension' => 'required|integer|max:10',
            'email' => 'required|string|email|max:255|unique:users',
            'per_id' => 'required|integer|max:15',
            'dom_id' => 'required|integer|max:15',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([            
            'username' => $data['username'],            
            'name' => $data['name'],                   
            'us_apellidopat' => $data['us_apellidopat'],        
            'us_apellidomat' => $data['us_apellidomat'], 
            'us_extension' => $data['us_extension'],
            'email' => $data['email'],
            'per_id' => $data['per_id'],
            'dom_id' => $data['dom_id'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
