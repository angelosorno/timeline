<?php  ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta charset="utf-8">
    <title>Registro OFAM | Osorno Family Anual Meeting</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" ></script> -->
  </head>
  <body>


    <div class="container">

      <form action="php/conf_singup.php" method="post" class="form-signin">
 <div class="text-center mb-4">
   <img alt="OFAM 2019" src="ofam_favicon.png" class="rounded mx-auto d-block" style="height: 100px;">
   <h2 class="h3 mb-3 font-weight-normal">Registro a OFAM</h2>
 </div>

 <?php if (count($errors)>0):?>
   <div class="alet alert-danger">
     <?php foreach ($errors as $error): ?>
     <li><?php echo $error; ?></li>
     <?php endforeach; ?>
   </div>
 <?php endif; ?>

 <!-- <div class="alet alert-danger">
   <li>Error</li>
 </div> -->

 <div class="form-label-group">
   <input type="text" name="username" value="<?php echo $username; ?>" class="form-control" placeholder="Usuario" required autofocus>
   <label for="username">Nombre</label>
 </div>

 <div class="form-label-group">
   <input type="email" name="email" value="<?php echo $email; ?>" class="form-control" placeholder="Email address" required autofocus>
   <label for="email">Email</label>
 </div>

 <div class="form-label-group">
   <input type="password" name="Password" class="form-control" placeholder="Password" required>
   <label for="Password">Contraseña</label>
 </div>

 <div class="form-label-group">
   <input type="password" name="PasswordConf" class="form-control" placeholder="Confirm Password" required>
   <label for="PasswordConf">Confirmar Contraseña</label>
 </div>

 <button name="singup-btn" class="btn btn-lg btn-primary btn-block" type="submit">Registrarme</button>
 <p class="mt-5 mb-3 text-muted text-center">Ya estoy registrado <a href="login.php">Ingresar</a> </p>
 <p class="mt-5 mb-3 text-muted text-center">&copy; 2019</p>

</form>
    </div>


  </body>
</html>
