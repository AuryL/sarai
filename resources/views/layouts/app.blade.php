<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- jstree -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jstree/3.3.5/themes/default/style.min.css" />
    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jstree/3.3.5/jstree.min.js"></script>

    <script src="{{ asset('/js/tree.js') }}"></script> 

    <!--  -->
    <link rel="stylesheet" href="dist/themes/default/style.min.css" />
    <link rel="stylesheet" href="./../../dist/themes/default/style.min.css" />

    <title>SANTANDER</title>


    <!-- Scripts -->
    <!-- <script src="{{ asset('js/app.js') }}" defer></script> -->
    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
 



</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    SANTANDER
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                        @else

                            <ul class="nav">
                                <li><a href="{{ route('tree') }}">RISKS´ TREE</a></li>                                
                                <li><a href="">Usuarios</a>
                                    <ul>
                                        <li><a href="">Alta</a></li>
                                        <li><a href="">Modificación</a></li>
                                        <!-- <li>Prueba
                                            <ul>
                                                <li><a href="">--</a></li>
                                                <li><a href="">--</a></li>
                                                <li><a href="">--</a></li>
                                                <li><a href="">--</a></li>
                                            </ul>
                                        </li> -->
                                    </ul>
                                </li>
                                <li><a href="">Dominios</a>
                                    <ul>
                                        <li><a href="">Alta</a></li>
                                        <li><a href="">Modificación</a></li>
                                    </ul>
                                </li>
                                <li><a href="">Procesos</a>
                                    <ul>
                                        <li><a href="">Alta</a></li>
                                        <li><a href="">Modificación</a></li>
                                    </ul>
                                </li>
                                <li><a href="">Subprocesos</a>
                                    <ul>
                                        <li><a href="">Alta</a></li>
                                        <li><a href="">Modificación</a></li>
                                    </ul>
                                </li>
                                <li><a href="">Riesgos</a>
                                    <ul>
                                        <li><a href="">Objetivos de Control</a></li>
                                        <li><a href="">Actividades</a></li>
                                        <li><a href="">Alta</a></li>
                                        <li><a href="">Baja</a></li>
                                    </ul>
                                </li>
                                <li><a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Salir') }}
                                    </a>
                                </li>
			                </ul>
                            
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>

   
</body>
</html>
