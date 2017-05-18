import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';

import * as css from './styles/todoHeader.css';

export interface TodoHeaderProperties extends WidgetProperties {
	allCompleted: boolean;
	addTodo: Function;
	toggleAllTodos: Function;
	updateTodo: Function;
	value: string;
}

export const TodoHeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TodoHeader extends TodoHeaderBase<TodoHeaderProperties> {

	render() {
		const { properties: { value, allCompleted } } = this;
		const newTodoProperties: any = {
			id: 'new-todo',
			afterCreate: this.afterCreate,
			classes: this.classes(css.newTodo),
			onkeyup: this.addTodo,
			oninput: this.updateTodo,
			value,
			placeholder: 'What needs to be done?'
		};

		return v('header', [
			v('h1', { classes: this.classes(css.title) }, [ 'todos' ]),
			v('input', newTodoProperties),
			v('input', { onchange: this.toggleAllTodos, checked: allCompleted, type: 'checkbox', classes: this.classes(css.toggleAll) })
		]);
	}

	private addTodo({ which, target: { value: label } }: any) {
		if (which === 13 && label) {
			this.properties.addTodo({ label, completed: false });
		}
	}

	private updateTodo({ target: { value } }: any) {
		this.properties.updateTodo(value);
	}

	private toggleAllTodos() {
		this.properties.toggleAllTodos();
	}

	private afterCreate(element: HTMLInputElement) {
		setTimeout(() => element.focus(), 0);
	}
}
