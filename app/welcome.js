iris.screen(function(self) {

    var todos = iris.resource(iris.path.resource),
        todoUIs = {};

    self.create = function() {
        self.tmpl(iris.path.welcome.html);

        self.get("new-todo").on("keyup", function(e) {
            if (e.keyCode === 13 && this.value.trim() !== "") {
                todos.add(this.value);
                this.value = "";
            }
        });

        self.get("toggle-all").on("change", function() {
            var completed = self.get("toggle-all").prop("checked");
            todos.setAll(completed);
        });

        self.get("clear-completed").on("click", todos.removeCompleted);

        // Resource events
        self.on(todos.CREATE_TODO, function(id) {
            var ui = self.ui("todo-list", iris.path.todo.js, {id: id});
            todoUIs[id] = ui;
            render();
        });

        self.on(todos.DESTROY_TODO, function(id) {
            todoUIs[id].destroyUI();
            delete todoUIs[id];
            render();
        });

        self.on(todos.CHANGE_TODO, function(id) {
            todoUIs[id].render();
            render();
        });

        todos.init();
        render();
    };

    function render() {
        self.inflate({
            completed: "Clear completed (" + todos.completedCount() + ")",
            remaining: todos.remainingCount(),
            hasTodos: (todos.count() !== 0),
            hasRemainings: (todos.completedCount() > 0),
            noRemainingTodos: (todos.remainingCount() === 0)
        });
    };

}, iris.path.welcome.js);
