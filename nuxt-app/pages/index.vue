<template>
    <div>
        <nav>
            <div class="menu">
                <p class="website_name"></p>
                <div class="menu_icon">
                    <span class="icon"></span>
                </div>
            </div>
        </nav>
        <section class="wrapper">
            <div class="container" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div id="scene" class="scene" data-hover-only="false">
                    <div class="circle" data-depth="1.2"></div>
                    <div class="one" data-depth="0.9">
                        <div class="content">
                            <span class="piece"></span>
                            <span class="piece"></span>
                            <span class="piece"></span>
                        </div>
                    </div>
                    <div class="two" data-depth="0.60">
                        <div class="content">
                            <span class="piece"></span>
                            <span class="piece"></span>
                            <span class="piece"></span>
                        </div>
                    </div>
                    <div class="three" data-depth="0.40">
                        <div class="content">
                            <span class="piece"></span>
                            <span class="piece"></span>
                            <span class="piece"></span>
                        </div>
                    </div>
                    <p class="pcenter" data-depth="0.50">Resonance</p>
                    <p class="pcenter" data-depth="0.10">Resonance</p>
                </div>
                <div class="text">
                    <article>
                        <p>Hello, I'm a developer.<br>Check out some of my stuff by clicking on the top-right buttons!</p>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>