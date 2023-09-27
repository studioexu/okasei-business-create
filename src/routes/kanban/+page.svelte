<script lang="ts">
	$: boards = [
		{ id: 'todo', tasks: [{ id: 'task1', title: 'Title', status: 'todo' }], text: 'Todo' },
		{ id: 'in-progress', tasks: [], text: 'In progress' },
		{ id: 'done', tasks: [], text: 'Done' }
	]

	$: currentTask = ''
	$: currentBoard = 0
	$: newBoard = 0
	$: hoveringBoard = 0

	const dragEnter = (event: Event, index: number) => {
		const id = (<HTMLElement>event.target).getAttribute('id')

		if (id && currentTask !== '' && boards.map(board => board.id).includes(id)) {
			newBoard = index
			hoveringBoard = index + 1
		}
	}

	const dragOver = (event: Event) => {
		event.preventDefault()
	}

	const drop = (index: number) => {
		let task: { id: string; title: string; status: string } | undefined

		boards[currentBoard].tasks = boards[currentBoard].tasks?.filter(
			(localTask: { id: string; title: string; status: string }) => {
				if (localTask.id !== currentTask) return localTask

				task = localTask
			}
		)

		if (task) {
			task.status = boards[newBoard].id
			let tasks = boards[newBoard].tasks
			if (tasks) {
				tasks?.push(task)
				boards[index].tasks = [...tasks]
			}
		}

		currentTask = ''
		currentBoard = 0
		newBoard = 0
		hoveringBoard = 0
	}

	const dragStart = (event: Event, index: number) => {
		currentTask = (<HTMLElement>event.target).getAttribute('id') ?? ''
		currentBoard = index
	}
</script>

<div class="kanban">
	{#each boards as board, index}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="area"
			class:is-hovering={index + 1 === hoveringBoard && currentBoard + 1 !== hoveringBoard}
			id={board.id}
			on:dragenter={event => dragEnter(event, index)}
			on:dragover={dragOver}
			on:drop={() => drop(index)}
		>
			<span>{board.text}</span>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			{#each board.tasks as task}
				<div
					class="task"
					id={task.id}
					draggable={true}
					on:dragstart={event => dragStart(event, index)}
					on:dragover={dragOver}
				>
					<p>{task.title}</p>
          <span>{task.status}</span>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.kanban {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.area {
		display: inline-block;
		width: 30%;
		height: 800px;
		margin: 0 auto;

		> span {
			display: block;
			color: #fff;
			text-align: center;
			margin: 16px 0;
		}
	}

	.is-hovering {
		opacity: 0.5;
	}

	#todo {
		background: red;
	}

	#in-progress {
		background: blue;
	}

	#done {
		background: green;
	}

	.task {
		width: 80%;
		height: 100px;
		background: #ccc;
		padding: 8px;
		margin: 0 auto 16px auto;
		cursor: grab;

		&:active {
			cursor: grabbing;
		}
	}
</style>
