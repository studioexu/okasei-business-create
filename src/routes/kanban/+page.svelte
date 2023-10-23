<script lang="ts" context="module">
	import { debounce } from '@/libs/utils'

	const getId = (event: Event) => (<HTMLElement>event.target).getAttribute('id')

	const resetMargin = (id: string) => {
		const element = document.getElementById(id)

		if (element) {
			element.style.marginTop = '0px'
			element.style.marginBottom = '16px'
		}
	}

	const click = (id: string) => alert(`Task ID: ${id} がクリックされました`)
</script>

<script lang="ts">
	let boards: {
		id: string
		tasks: {
			id: string
			title: string
			status: string
		}[]
		text: string
	}[] = [
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
	let currentTask: { id: string; index?: number } = { id: '' }
	let currentBoard = 0
	let newBoard = 0
	let hoveringBoard = 0
	let hoveringTask: { id: string; index?: number } = { id: '' }

	$: taskElement = document.getElementById(currentTask.id)

	$: isAdjacent =
		currentBoard === newBoard &&
		currentTask.index !== undefined &&
		hoveringTask.index !== undefined &&
		Math.abs(currentTask.index - hoveringTask.index) === 1

	let isDropped: boolean = false
	let currentClientY: number = 0
	let isUpper: boolean = false

	const dragEnter = (event: Event, index: number, type: 'board' | 'task') => {
		const id = getId(event)

		if (id) {
			if (type === 'board' && currentTask.id !== '') {
				if (hoveringBoard === index) resetMargin(hoveringTask.id)

				newBoard = index
				hoveringBoard = index + 1
			} else if (type === 'task' && id !== currentTask.id) {
				// console.log(hoveringTask)

				if (hoveringTask.id === '' && !hoveringTask.index) hoveringTask = { id, index }
				else if (id !== hoveringTask.id && hoveringTask.index) {
					resetMargin(hoveringTask.id)
					hoveringTask = { id, index }
				}
			}
		}
	}

	const drop = (index: number) => {
		let task: { id: string; title: string; status: string } | undefined

		boards[currentBoard].tasks = boards[currentBoard].tasks?.filter(
			(localTask: { id: string; title: string; status: string }) => {
				if (localTask.id !== currentTask.id) return localTask

				task = localTask
			}
		)

		if (task) {
			if (currentBoard !== newBoard) task.status = boards[newBoard].id
			const tasks = boards[newBoard].tasks

			if (tasks.length >= 0) {
				if (hoveringTask.index !== undefined) {
					if (isUpper && hoveringTask.index === 0) boards[index].tasks = [task, ...tasks]
					else {
						tasks.splice(
							isAdjacent || isUpper ? hoveringTask.index : hoveringTask.index + 1,
							0,
							task
						)
						boards[index].tasks = [...tasks]
					}
				} else boards[index].tasks.push(task)
			}
		}

		console.log(hoveringBoard, hoveringTask)

		task = undefined
		taskElement?.removeAttribute('style')
		currentTask = { id: '' }
		currentBoard = 0
		newBoard = 0
		hoveringBoard = 0
		resetMargin(hoveringTask.id)
		hoveringTask = { id: '' }
		isDropped = true
	}

	const dragOver = async (event: Event) => {
		event.preventDefault()

		const id = getId(event)

		if (id && id !== currentTask.id) {
			const rect = (<HTMLElement>event.target).getBoundingClientRect()
			const clientY = (<MouseEvent>event).clientY

			debounce(() => {
				if (currentClientY !== clientY) {
					const element = document.getElementById(hoveringTask.id)

					if (element) {
						isUpper = isAdjacent
							? currentTask.index! - hoveringTask.index! === 1
							: clientY - rect.top < rect.height / 2

						element.style[isUpper ? 'marginTop' : 'marginBottom'] = `${rect.height + 16 * 2}px`
						element.style[isUpper ? 'marginBottom' : 'marginTop'] = `${isUpper ? '16' : '0'}px`
					}

					currentClientY = clientY
				}
			}, 200)()
		}
	}

	const dragStart = (event: Event, index: number, taskIndex: number) => {
		const id = getId(event)

		if (id) currentTask = { id, index: taskIndex }

		if (taskElement) taskElement.style.opacity = '0.2'

		currentBoard = index
	}

	const dragEnd = () => {
		if (isDropped) isDropped = false
		else {
			taskElement?.removeAttribute('style')
			currentTask = { id: '' }
			currentBoard = 0
			newBoard = 0
			hoveringBoard = 0
			resetMargin(hoveringTask.id)
			hoveringTask = { id: '' }
			isDropped = false
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
			on:dragenter={event => dragEnter(event, index, 'board')}
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
					on:dragstart={event => dragStart(event, index, taskIndex)}
					on:dragenter={event => dragEnter(event, taskIndex, 'task')}
					on:dragover={dragOver}
					on:dragend={dragEnd}
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
