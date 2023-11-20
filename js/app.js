$(function () {      //fuehrt die function aus, nachdem das jquery document geladen wurde

    var data = {
        lastID: 0,
        pizzas: []
    };              //die grundlegenden Daten, mit denen die Pizzas erstellt werden

    var clickedPizza;
    var deletedPizza;
    var thisID;
    var isPizzaVisible = false;
    var octopus = {                         //alles was die daten bearbeitung betrifft, also nur die bearbeitung und nicht die darstellung
        addPizza: function () {              //die function für addPizza, also was beim durchfuehren davon passieren soll
            if (isPizzaVisible == true) {
                thisID = data.lastID;
                isPizzaVisible = false;
            }
            else {
                thisID = ++data.lastID;
            }


            data.pizzas.push({
                id: thisID,
                visible: true
            });                             //die Daten werden bearbeitet. (id wird um 1 erhoeht, sichtbar gemacht)
            view.render();                  //die daten werden an das view.render uebertragen, welches diese dann neu darstellt.
        },

        removePizza: function (pizza) {                             //die function für removePizza, also was beim durchfuehren davon passieren soll
            clickedPizza = data.pizzas[pizza.id - 1];
            clickedPizza.visible = false;                           //die Daten werden bearbeitet. (id wird um 1 verkleinert, die geklickte Pizza wird unsichtbar gemacht)
            isPizzaVisible = true;
            deletedPizza = pizza.id;
            view.render();                                          //die daten werden an das view.render uebertragen, welches diese dann neu darstellt.
        },

        getVisiblePizzas: function () {                                     //die function für getVisiblePizzas, also was beim durchfuehren davon passieren soll
            var visiblePizzas = data.pizzas.filter(function (pizza) {
                return pizza.visible;                                       //filtert, welche Pizzas sichtbar sind, ergibt nur die sichbaren Pizzas in der variable
            });
            return visiblePizzas;                                           //gibt die sichtbaren Pizzas wieder aus / zeigt sie wieder an
        },

        init: function () {      //initialisiert die function (initialisieren = einen Wert festlegen, oder in die richtige condition bringen, um die funktion ausfuehren zu koennen)
            view.init();        //zum init vom view 
        }
    };


    var view = {                                        //alles was die Darstellung betrifft, die Daten dazu wurden vom octopus uebergeben
        init: function () {                              //was angezeigt werden soll, nachdem die Berechnungen durchgefuehrt wurden
            var addPizzaBtn = $('.add-pizza');          //$('.add-pizza') bedeutet: getElementsByClass() der . vor add-pizza signalisiert, dass es eine class ist
            addPizzaBtn.click(function () {
                octopus.addPizza();                     //auf click wird eine neue Pizza erstellt
            });

            // grab elements and html for using in the render function
            this.$pizzaList = $('.pizza-list');                                 //das $ in der Variable signalisiert nur, dass es ein jQuery objekt ist, muesste also nicht gemacht werden (ist aber best practice)
            this.pizzaTemplate = $('script[data-template="pizza"]').html();     //holt das data-template pizza aus dem script teil im HTML

            // Delegated event to listen for removal clicks
            this.$pizzaList.on('click', '.remove-pizza', function (e) {          //diese function wird auf click aufgerufen, spezifiziert, dass nur die remove-pizza Elemente dazugehören sollen
                var pizza = $(this).parents('.pizza').data();                   //die parents() methode, ergibt alle ancestors von der class pizza, die data() methode gibt jegliche Daten aus über das ausgewaehlte Element
                octopus.removePizza(pizza);
                return false;                                                   //ueberschreibt die Voreinstellungen des Browsers
            });

            this.render();          //das ganze wird gerendert = in die render function weitergeleitet
        },

        render: function () {
            // Cache vars for use in forEach() callback (performance)
            var $pizzaList = this.$pizzaList,
                pizzaTemplate = this.pizzaTemplate;

            // Clear and render
            $pizzaList.html('');                                                    //leert alle vorherigen Eingaben aus den html-Teil
            octopus.getVisiblePizzas().forEach(function (pizza) {                    //holt zuerst aus dem octopus alle sichtbaren Pizzas und fuehrt dann für jede die function aus.

                var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);      // alle id's werden mit pizza.id ersetzt? /{{id}}/ ist auch im HTML-Teil vorhanden, daher ersetzt es diesen wahrscheinlich, (regular expression)
                $pizzaList.append(thisTemplate);                                    //die neu eingefuellten Daten werden appended  
            });
        }
    };

    octopus.init();     //der octopus wird initialisiert (geht zum init beim octopus)
}());
