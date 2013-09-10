iris.ui(function(self) {

    self.settings({
        id: null
    });

    var todos = iris.resource(iris.path.resource);

    self.create = function() {

        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.todo.html);

        self.get("check").on("click", function() {
            todos.toggle(self.setting("id"));
        });

        self.get("destroy").on("click", function() {
            todos.remove(self.setting("id"));
        });

        self.render();
        self.get().hide().fadeIn("slow");
    };

    self.render = function() {
        var todo = todos.getTodo(self.setting("id"));
        self.get().toggleClass("completed", todo.completed);
        self.inflate({todo: todo});
        return self;
    };

}, iris.path.todo.js);
