<script lang="ts" context="module">
	const resetMargin = (id: string) => {
		const element = document.getElementById(id)

		if (element) {
			element.style.marginTop = '0px'
			element.style.marginBottom = '16px'
		}
	}

	const debounce = (func: () => void, time: number) => {
		let timer: ReturnType<typeof setTimeout> | undefined

		if (timer) clearTimeout(timer)
		timer = setTimeout(func, time)
	}

	const click = (id: string) => alert(`Task ID: ${id} がクリックされました`)
</script>

<script lang="ts">
	$: boards = [
		{
			id: 'todo',
			tasks: [
				{ id: 'task7', title: 'Title7', status: 'todo' },
				{ id: 'task10', title: 'Title10', status: 'todo' },
				{ id: 'task11', title: 'Title11', status: 'todo' }
			],
			text: 'Todo'
		},
		{
			id: 'in-progress',
			tasks: [
				{ id: 'task6', title: 'Title6', status: 'in-progress' },
				{ id: 'task8', title: 'Title8', status: 'in-progress' },
				{ id: 'task9', title: 'Title9', status: 'in-progress' }
			],
			text: 'In progress'
		},
		{
			id: 'done',
			tasks: [
				{ id: 'task1', title: 'Title1', status: 'done' },
				{ id: 'task2', title: 'Title2', status: 'done' },
				{ id: 'task3', title: 'Title3', status: 'done' },
				{ id: 'task4', title: 'Title4', status: 'done' },
				{ id: 'task5', title: 'Title5', status: 'done' }
			],
			text: 'Done'
		}
	]

	$: currentTask = ''
	$: currentBoard = 0
	$: newBoard = 0
	$: hoveringBoard = 0
	$: hoveringTask = { id: '', index: null } as { id: string; index: number | null }
	let currentClientY: number = 0
	let isUpper: boolean = false

	const dragEnterOnBoard = (event: Event, index: number) => {
		if ((<HTMLElement>event.target).getAttribute('id') && currentTask !== '') {
			newBoard = index
			hoveringBoard = index + 1
		}
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
			if (currentBoard !== newBoard) task.status = boards[newBoard].id
			let tasks = boards[newBoard].tasks

			if (tasks.length >= 0 && hoveringTask.index !== null) {
				if (isUpper && hoveringTask.index === 0) boards[index].tasks = [task, ...tasks]
				else {
					tasks.splice(hoveringTask.index, 0, task)
					boards[index].tasks = [...tasks]
				}
			}
		}

		task = undefined
		document.getElementById(currentTask)?.removeAttribute('style')
		currentTask = ''
		currentBoard = 0
		newBoard = 0
		hoveringBoard = 0
		resetMargin(hoveringTask.id)
		hoveringTask = { id: '', index: null }
	}

	const dragOver = async (event: Event) => {
		event.preventDefault()

		const id = (<HTMLElement>event.target).getAttribute('id')

		if (id && id !== currentTask) {
			const rect = (<HTMLElement>event.target).getBoundingClientRect()
			const clientY = (<MouseEvent>event).clientY

			debounce(() => {
				if (currentClientY !== clientY) {
					const element = document.getElementById(hoveringTask.id)

					if (element) {
						isUpper = clientY - rect.top < rect.height / 2

						element.style[isUpper ? 'marginTop' : 'marginBottom'] = `${rect.height + 16 * 2}px`
						element.style[isUpper ? 'marginBottom' : 'marginTop'] = `${isUpper ? '16' : '0'}px`
					}

					currentClientY = clientY
				}
			}, 100)
		}
	}

	const dragStart = (event: Event, index: number) => {
		currentTask = (<HTMLElement>event.target).getAttribute('id') ?? ''

		if (currentTask !== '') document.getElementById(currentTask)!.style.opacity = '0.2'
		currentBoard = index
	}

	const dragEnterOnTask = (event: Event, index: number) => {
		const id = (<HTMLElement>event.target).getAttribute('id')

		if (id && id !== currentTask) {
			if (hoveringTask.id === '' && hoveringTask.index === null) hoveringTask = { id, index }
			else if (id !== hoveringTask.id && hoveringTask.index) {
				resetMargin(hoveringTask.id)
				hoveringTask = { id, index }
			}
		}
	}
</script>

<div class="kanban">
	{#each boards as board, index}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="board"
			class:is-hovering={index + 1 === hoveringBoard && currentBoard + 1 !== hoveringBoard}
			id={board.id}
			on:dragenter={event => dragEnterOnBoard(event, index)}
			on:dragover={event => event.preventDefault()}
			on:drop={() => drop(index)}
		>
			<span>{board.text}</span>
			{#each board.tasks as task, taskIndex}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="task"
					id={task.id}
					draggable={true}
					on:dragstart={event => dragStart(event, index)}
					on:dragenter={event => dragEnterOnTask(event, taskIndex)}
					on:dragover={dragOver}
					on:click={() => click(task.id)}
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

	.board {
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

	#todo {
		background: red;

		&.is-hovering {
			background: rgba(red, 0.5);
		}
	}

	#in-progress {
		background: blue;

		&.is-hovering {
			background: rgba(blue, 0.5);
		}
	}

	#done {
		background: green;

		&.is-hovering {
			background: rgba(green, 0.5);
		}
	}

	.task {
		width: 80%;
		height: 100px;
		background: #bbb;
		padding: 8px;
		margin: 0 auto 16px auto;
		cursor: grab;

		&:active {
			cursor: grabbing;
		}

		> p {
			margin-bottom: 16px;
		}
	}
</style>
