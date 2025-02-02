$(function () {      //fuehrt die function aus, nachdem das jquery document geladen wurde

    const data = {
        lastID: 0,
        pizzas: []
    };                         //die grundlegenden Daten, mit denen die Pizzas erstellt werden
    
    const octopus = {                         //alles was die daten bearbeitung betrifft, also nur die bearbeitung und nicht die darstellun

        hasVisiblePizzaWithId: (id) => {                  //id wird von ret geholt ud hat auch den Wert von ret. grundsätzlich ist ret = false. dann wird bei jeder Pizza geschaut, ob die pizza.id der id (also ret) entspricht,
            ret = false;                                        //und ob die Pizza visible ist. wenn beides true ist, wird auch ret = true. am Schluss wid dann der boolean von ret returned. 
            
            for (pizza of data.pizzas) {
                if ((pizza.id == id) && (pizza.visible)) {      //wenn es true ist, bedeutet das, dass schon eine Pizza mit der id existiert, die auch visible ist.
                    ret = true;                                 //wenn es false ist, dann heisst das, dass noch eine neue Pizza gemacht werden muss, da keine existiert, die die Kriterien erfüllt.
                }
            }
            return ret;
        },

        getIdForNextPizza: function () {                //ret (steht für return) ist 1. Geht dann zur function hasVisiblePizzaWithId() und holt von dort true oder false.
            let ret = 1;                                //wenn es false ist, dann get es nicht in die while, sondern returnt ret (also am anfang z.B. 1)
            while (this.hasVisiblePizzaWithId(ret)) {   //wenn es true ist, geht es hinein, da die kontrollierte Zahl schon existiert, und erhöht ret und schaut dann nochmals, es macht das so lange, bis es false ist.
                ret++;
            }
            return ret;
        },

        addPizza: function () {              //die function für addPizza, also was beim durchfuehren davon passieren soll
            const thisID = this.getIdForNextPizza();          //geht zur getIdForNextPizza() function

            data.pizzas.push({
                id: thisID,
                visible: true
            });                             //die Daten werden bearbeitet. (id wird um 1 erhoeht, sichtbar gemacht)

            view.render();                  //die daten werden an das view.render uebertragen, welches diese dann neu darstellt.
        },

        removePizza: (pizza) => {                              //die function für removePizza, also was beim durchfuehren davon passieren soll
            const indexOfPizzas = data.pizzas.findIndex(function (element) {         //sucht den index, der element.id == pizza.id = true ist. element ist immer das aktuelle Array Element, start beim ersten Array Element, mit id, visibility etc.
                let ret = false;
                if (element.id == pizza.id) {
                    ret = true;                                                          //wenn es true ist, wird der index ans splice weitergegeben, wen es false ist, wird die function widerholt, bis es true ist. wenn es false ist, dann geht es zum nächsten Inhalt
                }
                return ret;
            })
            data.pizzas.splice(indexOfPizzas, 1);                                   //löscht das element mit dem oben herausgefundenen index, das zweite ist die anzahl der zu löschenden elemente, in diesem Fall nur 1

            view.render();                                          //die daten werden an das view.render uebertragen, welches diese dann neu darstellt.
        },

        getVisiblePizzas: () => {                                      //die function für getVisiblePizzas, also was beim durchfuehren davon passieren soll
            const visiblePizzas = data.pizzas.filter(function (pizza) {
                return pizza.visible;                                       //filtert, welche Pizzas sichtbar sind, ergibt nur die sichbaren Pizzas in der variable
            });
            return visiblePizzas;                                           //gibt die sichtbaren Pizzas wieder aus / zeigt sie wieder an
        },

        init: function () {      //initialisiert die function (initialisieren = einen Wert festlegen, oder in die richtige condition bringen, um die funktion ausfuehren zu koennen)

            view.init();        //zum init vom view 
        }
    };
    const view = {                                        //alles was die Darstellung betrifft, die Daten dazu wurden vom octopus uebergeben

        init: function () {                              //was angezeigt werden soll, nachdem die Berechnungen durchgefuehrt wurden

            const addPizzaBtn = $('.add-pizza');          //$('.add-pizza') bedeutet: getElementsByClass() der . vor add-pizza signalisiert, dass es eine class ist
            addPizzaBtn.click(function () {
                octopus.addPizza();                     //auf click wird eine neue Pizza erstellt
            });

            this.$pizzaList = $('.pizza-list');                                 //das $ in der Variable signalisiert nur, dass es ein jQuery objekt ist, muesste also nicht gemacht werden (ist aber best practice)
            this.pizzaTemplate = $('script[data-template="pizza"]').html();     //holt das data-template pizza aus dem script teil im HTML

            this.$pizzaList.on('click', '.remove-pizza', function (e) {          //diese function wird auf click aufgerufen, spezifiziert, dass nur die remove-pizza Elemente dazugehören sollen
                const pizza = $(this).parents('.pizza').data();                   //die parents() methode, ergibt alle ancestors von der class pizza, die data() methode gibt jegliche Daten aus über das ausgewaehlte Element
                octopus.removePizza(pizza);
                return false;                                                   //ueberschreibt die Voreinstellungen des Browsers
            });
            this.render();          //das ganze wird gerendert = in die render function weitergeleitet
        },

        render: function () {

            const $pizzaList = this.$pizzaList,
                pizzaTemplate = this.pizzaTemplate;

            $pizzaList.html('');                                                    //leert alle vorherigen Eingaben aus den html-Teil
            octopus.getVisiblePizzas().forEach((pizza) => {                    //holt zuerst aus dem octopus alle sichtbaren Pizzas und fuehrt dann für jede die function aus.

                const thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);      //alle id's werden mit pizza.id ersetzt? /{{id}}/ ist auch im HTML-Teil vorhanden, daher ersetzt es diesen wahrscheinlich, (regular expression)
                $pizzaList.append(thisTemplate);                                    //die neu eingefuellten Daten werden appended
            });
        }
    };

    octopus.init();     //der octopus wird initialisiert (geht zum init beim octopus)
}());