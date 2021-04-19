<template>
  <nav class="navbar navbar-expand-lg navbar-light">
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
                        <form class="form-inline my-lg-0 ">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span class="icon">
                                            <i><img src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                                                    style="width:25px;" /></i>
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span class="icon">
                                            <i><img src="https://img.icons8.com/pastel-glyph/64/000000/fast-delivery--v1.png"
                                                    style="width:25px;" /></i>
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span class="icon">
                                            <i><img src="https://img.icons8.com/material-rounded/24/000000/appointment-reminders.png"
                                                    style="width:25px;" /></i>
                                        </span>
                                    </a>
                                </li>
                                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalLogin">เข้าสู่ระบบ</button>
                            </ul>
                        </form>
                    </div>
                </nav>
</template>
<script>
export default {};
</script>