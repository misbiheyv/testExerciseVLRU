<template>
    <div class="btn-wrapper btn">
        <slot>
        </slot>
    </div>
</template>

<style scoped>
.btn {
    display: inline-flex;
    background: none;
    padding: 12px 20px;
    font-size: 18px;
    line-height: 130%;
    border-radius: 5px;
    background-color: white;
    justify-content: center;
    align-content: center;
    cursor: pointer;

    -webkit-box-shadow: 0px 0px 10px -6px rgba(34, 60, 80, 0.8); 
    -moz-box-shadow: 0px 0px 10px -6px rgba(34, 60, 80, 0.8); 
    box-shadow: 0px 0px 10px -6px rgba(34, 60, 80, 0.8);
}
</style>