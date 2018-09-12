@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <!-- Expediente -->
                        <div class="form-group row">
                            <label for="username" class="col-md-4 col-form-label text-md-right">{{ __('Expediente') }}</label>

                            <div class="col-md-6">
                                <input id="username" type="text" class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}" name="username" value="{{ old('username') }}" required autofocus pattern="[A-Za-z0-9]+">

                                @if ($errors->has('username'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        
                        <!-- Nombre -->
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Nombre') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus pattern="[A-Za-z]+">

                                @if ($errors->has('name'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <!-- Apellido Paterno -->
                        <div class="form-group row">
                            <label for="us_apellidopat" class="col-md-4 col-form-label text-md-right">{{ __('Apellido Paterno') }}</label>

                            <div class="col-md-6">
                                <input id="us_apellidopat" type="text" class="form-control{{ $errors->has('us_apellidopat') ? ' is-invalid' : '' }}" name="us_apellidopat" value="{{ old('us_apellidopat') }}" required autofocus pattern="[A-Za-z]+">

                                @if ($errors->has('us_apellidopat'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('us_apellidopat') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <!-- Apellido Materno -->
                        <div class="form-group row">
                            <label for="us_apellidomat" class="col-md-4 col-form-label text-md-right">{{ __('Apellido Materno') }}</label>

                            <div class="col-md-6">
                                <input id="us_apellidomat" type="text" class="form-control{{ $errors->has('us_apellidomat') ? ' is-invalid' : '' }}" name="us_apellidomat" value="{{ old('us_apellidomat') }}" required autofocus pattern="[A-Za-z]+">

                                @if ($errors->has('us_apellidomat'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('us_apellidomat') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <!-- Extensión -->
                        <div class="form-group row">
                            <label for="us_extension" class="col-md-4 col-form-label text-md-right">{{ __('Extensión') }}</label>

                            <div class="col-md-6">
                                <input id="us_extension" type="text" class="form-control{{ $errors->has('us_extension') ? ' is-invalid' : '' }}" name="us_extension" value="{{ old('us_extension') }}" required autofocus pattern="[0-9]+">

                                @if ($errors->has('us_extension'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('us_extension') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('Email') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <!-- Perfil -->
                        <div class="form-group{{ $errors->has('per_id') ? ' has-error' : '' }}">
                            <label class="label-texto"><strong>{{ Form::label('per_id', 'Perfil: ') }}</strong></label>
                            <select id="per_id" name="per_id" class="form-control">
                                <option selected value="0" disabled="disabled" > Perfil </option>                               
                                <option value="1">Superusuario</option>  
                                <option value="2">Subdirector</option>  
                                <option value="3">Consulta</option>  
                            </select>
                            <br>
                            @if ($errors->has('per_id'))
                                <span class="invalid-feedback">
                                    <label class="label-texto"><strong>{{ $errors->first('per_id') }}</strong></label>
                                </span>
                            @endif
                        </div>

                        <!-- Dominio -->
                        <div class="form-group{{ $errors->has('dom_id') ? ' has-error' : '' }}">
                            <label class="label-texto"><strong>{{ Form::label('dom_id', 'Dominio: ') }}</strong></label>
                            <select id="dom_id" name="dom_id" class="form-control">
                                <option selected value="0" disabled="disabled" > Dominio </option>
                                <option value="1">Infraestructura</option>                             
                                <option value="2">Aplicaciones</option>                               
                                <option value="3">Ciberseguridad</option>                               
                                <option value="4">Regulaciones</option>                                   
                            </select>
                            <br>
                            @if ($errors->has('dom_id'))
                                <span class="invalid-feedback">
                                    <label class="label-texto"><strong>{{ $errors->first('dom_id') }}</strong></label>
                                </span>
                            @endif
                        </div>
                        
                        <!-- Password -->
                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <!-- Confirmar Password -->
                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirmar Password') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
