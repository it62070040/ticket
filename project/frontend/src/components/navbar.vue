<template>
  <nav class="navbar navbar-expand-lg navbar-light" style=" box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);">
                    <a class="navbar-brand" href="#">
                        <img src="../assets/logo.png" width="30" height="auto" alt="">
                    </a>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <router-link to="/">
                                <a class="nav-link" href="#">หน้าแรก</a>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">คอนเสิร์ต</a>
                            </li>

                        </ul>
                        <router-link to="/create">
                        <button type="button" class="btn btn-danger">New Concert</button>
                        </router-link>
                        <form class="form-inline my-lg-0 ml-3">
                                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalLogin">เข้าสู่ระบบ</button>
                        </form>
                    </div>
                </nav>
</template>
<script>
export default {};
</script>