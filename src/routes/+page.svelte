<script lang="ts">
	import TeamCard from '$lib/TeamCard.svelte';


	let players = $state({
		backlines: {
			player_1: '',
			player_2: ''
		},
		supports: {
			player_1: '',
			player_2: ''
		},
		slayers: {
			player_1: '',
			player_2: '',
			player_3: '',
			player_4: ''
		}
	});

	let alphaTeam = $state({
		backline: '',
		support: '',
		slayer1: '',
		slayer2: ''
	});

	let bravoTeam = $state({
		backline: '',
		support: '',
		slayer1: '',
		slayer2: ''
	});
</script>

<div class="page-container">
	<div class="input-container">
		{#each Object.entries(players) as [role, rolePlayers]}
            <h3>{role}</h3>
            {#each Object.keys(rolePlayers) as key}
                <input
                    type="search"
                    placeholder="Enter player..."
                    bind:value={(players as any)[role as string][key as string]}
                />
            {/each}
		{/each}
	</div>

	<p>{players.backlines.player_1}</p>
	<p>{players.backlines.player_2}</p>
	<p>{players.supports.player_1}</p>
	<p>{players.supports.player_2}</p>
	<p>{players.slayers.player_1}</p>
	<p>{players.slayers.player_2}</p>
	<p>{players.slayers.player_3}</p>
	<p>{players.slayers.player_4}</p>

	<div class="card-container">
		<TeamCard backline="B" support="S" slayer1="S1" slayer2="S2" />
		<TeamCard backline="B" support="S" slayer1="S1" slayer2="S2" />
	</div>
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 0;
		height: 100vh;
	}

	.input-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 10rem;
		border: 3px solid black;
	}

	.card-container {
		display: flex;
		justify-content: center;
		width: 100%;
		border: 3px solid black;
	}
</style>