import { ProjectorMixin } from "@dojo/widget-core/mixins/Projector";
import { Route } from "@dojo/routing/Route";
import router from './routes';

const root = document.querySelector('my-app');

const Projector = ProjectorMixin(TodoApp);
const projector = new Projector();

const filterRoute = new Route<any, any>({
    path: '/{filter}',
    exec(request) {
        const { filter } = request.params;
        projector.setProperties({ filter });
    }
});
router.append(filterRoute);
projector.append(root);
router.start();