$(function() {      //führt die function aus, nachdem das jquery document geladen wurde

    var data = {
        lastID: 0,
        pizzas: []
    };              //die grundlegenden Daten, mit denen die Pizzas erstellt werden


    var octopus = {                         //alles was die daten bearbeitung betrifft, also nur die bearbeitung und nicht die darstellung
        addPizza: function() {              //die function für addPizza, also was beim durchführen davon passieren soll
            var thisID = ++data.lastID;     

            data.pizzas.push({
                id: thisID,
                visible: true
            });                             //die Daten werden bearbeitet. (id wird um 1 erhöht, sichtbar gemacht)
            view.render();                  //die daten werden an das view.render übertragen, welches diese dann neu darstellt.
        },

        removePizza: function(pizza) {                              //die function für removePizza, also was beim durchführen davon passieren soll
            var clickedPizza = data.pizzas[ pizza.id - 1 ];
            clickedPizza.visible = false;                           //die Daten werden bearbeitet. (id wird um 1 verkleinert, die geklickte Pizza wird unsichtbar gemacht)
            view.render();                                          //die daten werden an das view.render übertragen, welches diese dann neu darstellt.
        },

        getVisiblePizzas: function() {                                      //die function für getVisiblePizzas, also was beim durchführen davon passieren soll
            var visiblePizzas = data.pizzas.filter(function(pizza) {
                return pizza.visible;                                       //filtert, welche Pizzas sichtbar sind, ergibt nur die sichbaren Pizzas in der variable
            });
            return visiblePizzas;                                           //gibt die sichtbaren Pizzas wieder aus / zeigt sie wieder an
        },

        init: function() {      //initialisiert die function (initialisieren = einen Wert festlegen, oder in die richtige condition bringen, um die funktion ausführen zu können)
            view.init();        //zum init vom view 
        }
    };


    var view = {                                        //alles was die Darstellung betrifft, die Daten dazu wurden vom octopus übergeben
        init: function() {                              //was angezeigt werden soll, nachdem die Berechnungen durchgeführt wurden
            var addPizzaBtn = $('.add-pizza');          //$('.add-pizza') bedeutet: getElementsByClass() der . vor add-pizza signalisiert, dass es eine class ist
            addPizzaBtn.click(function() {
                octopus.addPizza();                     //auf click wird eine neue Pizza erstellt
            });

            // grab elements and html for using in the render function
            this.$pizzaList = $('.pizza-list');                                 //das $ in der Variable signalisiert nur, dass es ein jQuery objekt ist, müsste also nicht gemacht werden (best practice)
            this.pizzaTemplate = $('script[data-template="pizza"]').html();     //holt das data-template pizza aus dem script teil im html

            // Delegated event to listen for removal clicks
            this.$pizzaList.on('click', '.remove-pizza', function(e) {          //diese function wird auf click aufgerufen, spezifiziert, dass nur die remove-pizza elemente dazugehören sollen
                var pizza = $(this).parents('.pizza').data();                   //die parents() methode, ergibt alle ancestors von der class pizza, die data() methode gibt jegliche daten aus über das ausgewählte element
                octopus.removePizza(pizza);
                return false;                                                   //die Pizza wird ausgeblendet, (visibility = false???)
            });

            this.render();          //das ganze wird gerendert = in die render function weitergeleitet
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            var $pizzaList = this.$pizzaList,
                pizzaTemplate = this.pizzaTemplate;

            // Clear and render
            $pizzaList.html('');                                                    //leert alle vorherigen eingaben aus den html-Teil
            octopus.getVisiblePizzas().forEach(function(pizza) {                    //holt zuerst aus dem octopus alle sichtbaren Pizzas und führt dann für jede de function aus.
                // Replace template markers with data
                var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);      //alle id's werden mit pizza.id ersetzt
                $pizzaList.append(thisTemplate);                                    //die neu eingefüllten daten werden appended
            });
        }
    };

    octopus.init();     //der octopus wird initialisiert
}());
