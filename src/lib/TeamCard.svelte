<script>
    let {backline, support, slayer1, slayer2} = $props();
</script>

<div class="card">
    <p>{backline}</p>
    <p>{support}</p>
    <p>{slayer1}</p>
    <p>{slayer2}</p>
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        width: 100%;
        border: 3px solid black;
        border-radius: 25px;
    }

</style>