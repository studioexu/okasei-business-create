<script lang="ts" context="module">
	import { debounce } from '@/libs/utils'

	const blankBoards: {
		id: string
		tasks: { id: number; title: string; status: string }[]
		text: string
	}[] = [
		{ id: 'todo', tasks: [], text: 'Todo' },
		{ id: 'in-progress', tasks: [], text: 'In progress' },
		{ id: 'done', tasks: [], text: 'Done' }
	]
	const boardList = blankBoards.map(board => board.id)
	const minus: number = Number.NEGATIVE_INFINITY

	const getElement = (event: MouseEvent) => <HTMLElement>event.target
	const onClick = (id: number) => alert(`Task ID: ${id}がクリックされました`)
</script>

<script lang="ts">
	const tasks = [
		{ id: 1, title: 'Title1', status: 'done' },
		{ id: 2, title: 'Title2', status: 'done' },
		{ id: 3, title: 'Title3', status: 'done' },
		{ id: 4, title: 'Title4', status: 'done' },
		{ id: 5, title: 'Title5', status: 'done' },
		{ id: 6, title: 'Title6', status: 'in-progress' },
		{ id: 7, title: 'Title7', status: 'todo' },
		{ id: 8, title: 'Title8', status: 'in-progress' },
		{ id: 9, title: 'Title9', status: 'in-progress' },
		{ id: 10, title: 'Title10', status: 'todo' },
		{ id: 11, title: 'Title11', status: 'todo' }
	]

	const boards = blankBoards.map(board => ({
		id: board.id,
		tasks: tasks.filter(task => task.status === board.id),
		text: board.text
	}))

	let draggingElement: HTMLElement | undefined = undefined
	let draggingData: { board: number; task: number } = { board: minus, task: minus }

	const onDragOver = debounce((event: MouseEvent, index: number) => {
		event.preventDefault()

		const element = getElement(event)

		if (draggingElement && element.classList.contains('board')) {
			let closestTask: HTMLElement | undefined = undefined

			for (const task of element.querySelectorAll('.task:not(.is-dragging)')) {
				if (closestTask) continue

				const offset = event.clientY - task.getBoundingClientRect().top

				if (offset < 0 && offset > minus) closestTask = <HTMLElement>task
			}

			element.insertBefore(draggingElement, closestTask ?? null)

			const task = tasks.find(task => task.id === parseInt(draggingElement?.id ?? '', 10))

			if (task) task.status = boardList[index]
		}
	}, 100)

	const onDragStart = (event: MouseEvent, index: number, taskIndex: number) => {
		draggingData = { board: index, task: taskIndex }
		draggingElement = getElement(event)
	}

	const onDragEnd = () => {
		draggingData = { board: minus, task: minus }
		draggingElement = undefined
	}
</script>

<div class="kanban">
	<!-- {@html html} -->
	{#each boards as board, index}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			id={board.id}
			class="board"
			class:is-hovering={index === draggingData.board}
			on:dragover={event => onDragOver(event, index)}
		>
			<h3>{board.text}</h3>
			{#each board.tasks as task, taskIndex}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="task"
					class:is-dragging={index === draggingData.board && taskIndex === draggingData.task}
					id={task.id.toString()}
					draggable={true}
					data-status={task.status}
					on:click={() => onClick(task.id)}
					on:dragstart={event => onDragStart(event, index, taskIndex)}
					on:dragend={onDragEnd}
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

		.board {
			display: flex;
			flex-direction: column;
			gap: 16px;
			width: 30%;
			height: 800px;
			padding: 16px 0;
			margin: 0 auto;

			&#todo {
				background: red;

				&.is-hovering {
					background: rgba(red, 0.5);
				}
			}

			&#in-progress {
				background: blue;

				&.is-hovering {
					background: rgba(blue, 0.5);
				}
			}

			&#done {
				background: green;

				&.is-hovering {
					background: rgba(green, 0.5);
				}
			}

			> h3 {
				display: block;
				color: #fff;
				text-align: center;
			}

			.task {
				width: 80%;
				height: 100px;
				background: #bbb;
				padding: 8px;
				margin: 0 auto;
				cursor: grab;

				&.is-dragging {
					opacity: 0.5;
				}

				&:active {
					cursor: grabbing;
				}

				> p {
					margin-bottom: 16px;
				}
			}
		}
	}
</style>
