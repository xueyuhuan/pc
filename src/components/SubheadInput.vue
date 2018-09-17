<template>
    <div class="subhead-input _theme_input">
        <slot name="input"></slot>
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .subhead-input{
        height: 30px;
        input{
            width: 160px;
            @media only screen and (max-width:767px) {
                width: 100px;
            }
            height: 100%;
            font-size: 12px;
            padding: 5px 15px;
            border-radius: 30px 0 0 30px;
            border: none;
            outline: none;
            color: white;
        }
        input::-webkit-input-placeholder{
            color:#bfbfbf;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#bfbfbf;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#bfbfbf;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
            color:#bfbfbf;
        }
        button{
            height: 100%;
            font-size: 12px;
            padding: 5px 10px;
            border-radius: 0 30px 30px 0;
            border: none;
            outline: none;
        }
    }
</style>