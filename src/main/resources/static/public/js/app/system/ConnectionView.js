var ConnectionView = function () {
	// Thuộc tính
	var that = this;
	this.AppTitle = 'Connection';
	this.oTable = null;
    this.oDialog = null;
    this.oCashier = new Cashier();
    this.oPosTerminal = new Posterminal();
    that.oPosprofile = new Posprofile();

	this.sampleData = {
		"class": "go.GraphLinksModel",
        "nodeDataArray": [
            {"key":"2", "text":"Payment Manager", "type":"T2", "loc":"365 450"},
            {"key":"4", "text":"HIS Endpoint", "type":"T4", "loc":"100 100", "group": "Cloud"},
            {"key":"Cloud", "isGroup":"true"},
            {"key":"Cashier", "isGroup":"true"},
            {"key":"POS Terminal", "isGroup":"true"},
            {"key":"POS Profile", "isGroup":"true"}
        ],
        "linkDataArray": [
            {"from":"2", "to":"4"},
        ]
	};

	// Phương thức
	this.initPage = function () {
        $('#AppTitle').html(that.AppTitle);
    }
    
    this.addListCashierToData = function(){
        var LIST = that.oCashier.search("").RESULT;
        var posX = 100;
        var posY = 250;
        for(var i = 0; i<LIST.length;i++){
            var item = LIST[i];
            that.oCashier.cashierid = item.cashierid;
            var checkResult = that.oCashier.checkConnect();
            problemConnect = checkResult.CODE == "00" ? "ok" : "";
            problemEntity = item.status == 1 ? "ok":"";
            textLink = checkResult.CODE == "00" ? checkResult.RESULT+" ms" : "";
            
            that.sampleData.nodeDataArray.push({"key":"cashierid"+item.cashierid,"text":item.name + "\n" + item.ipaddress,"type":"T5", "loc":posX + " "+ posY, "group": "Cashier","problem":problemEntity});
            that.sampleData.linkDataArray.push({"from":"cashierid"+item.cashierid,"to":"2","problem":problemConnect,"text":textLink});
            that.sampleData.linkDataArray.push({"from":"4","to":"cashierid"+item.cashierid});
            posX += 275;
        }
    }
    this.addListPosterminalToData = function(){
        var LIST = that.oPosTerminal.search("").RESULT;
        var posX = 100;
        var posY = 650;
        for(var i = 0; i<LIST.length;i++){
            var item = LIST[i];
            that.oPosTerminal.posterminalid = item.posterminalid;
            var checkResult = that.oPosTerminal.checkConnect();
            problemConnect = checkResult.CODE == "00" ? "ok" : "";
            problemEntity = item.status == 1 ? "ok":"";
            textLink = checkResult.CODE == "00" ? checkResult.RESULT+" ms" : " failed";
            that.sampleData.nodeDataArray.push({"key":"posterminalid"+item.posterminalid,"text":item.name + "\n" + item.ipaddress,"type":"T6", "loc":posX + " "+ posY,"group":"POS Terminal","problem":problemEntity});
            that.sampleData.linkDataArray.push({"from":"2","to":"posterminalid"+item.posterminalid,"problem":problemConnect,"text":textLink});   
            posX += 175;
        }
    }

    this.addPosprofileListToData = function(){
        var LIST = that.oPosprofile.search("").RESULT;
        var posX = 950;
        var posY = 377;
        for(var i = 0; i<LIST.length;i++){
            var item = LIST[i];
            that.oPosprofile.posprofileid = item.posprofileid;
            var checkResult = that.oPosprofile.checkConnect();
            problemConnect = checkResult.CODE == "00" ? "ok" : "";
            textLink = checkResult.CODE == "00" ? checkResult.RESULT+" ms" : "";
            that.sampleData.nodeDataArray.push({"key":"posprofileid"+item.posprofileid,"text":item.name,"type":"T7", "loc":posX + " "+ posY,"group":"POS Profile"});
            that.sampleData.linkDataArray.push({"from":"2","to":"posprofileid"+item.posprofileid,"problem":problemConnect,"text":textLink});
            posY += 100;
        }
    }



	// Sự kiện
	$(document).ready(function () {

        that.oDialog = new PopupDialog(reload);

        $('.ACTIONS').on('click', '#btnAdd', function () {
			var url = CONFIG_APP.URL.CONTEXT + '/app/system/connectionadd';
			that.oDialog.show('Thêm mới kết nối', url, '45%', '600px');
        });
        
        function reload() {
			//init();
		}

        that.addListCashierToData();
        that.addListPosterminalToData();
        that.addPosprofileListToData();
        function init() {
            if (window.goSamples) goSamples();
            var $ = go.GraphObject.make;

            myDiagram =
                $(go.Diagram, "myDiagramDiv",
                {
                    "undoManager.isEnabled": true
                });

            var cxElement = document.getElementById("contextMenu");

            var myContextMenu = $(go.HTMLInfo, {
                show: showContextMenu,
                hide: hideContextMenu
            });

            function nodeTypeImage(type) {
                switch (type) {
                    case "T1": return "../../../public/templates/medic247/cisco-icons/sunworkstation.png";
                    case "T2": return "../../../public/templates/medic247/cisco-icons/storageserver.png";
                    case "T3": return "../../../public/templates/medic247/cisco-icons/keys.png";
                    case "T4": return "../../../public/templates/medic247/cisco-icons/branchoffice.png";
                    case "T5": return "../../../public/templates/medic247/cisco-icons/androgenousperson.png";
                    case "T6": return "../../../public/templates/medic247/cisco-icons/scanner.png";
                    case "T7": return "../../../public/templates/medic247/cisco-icons/diskette.png";
                    default: return "";
                }
            }

            function nodeTypeSize(type) {
                switch (type) {
                    case "T1": return new go.Size(70, 70);
                    case "T2": return new go.Size(70, 70);
                    case "T3": return new go.Size(70, 70);
                    case "T4": return new go.Size(70, 70);
                    case "T5": return new go.Size(70, 70);
                    case "T6": return new go.Size(70, 70);
                    case "T7": return new go.Size(70, 70);
                    default: return new go.Size(80, 70);
                }
            }

            function nodeProblemConverter(msg) {
                if (msg) return "#33ff33";
                return "red";
            }

            function linkProblemConverter(msg) {
                if (msg) return "#33ff33";
                return "red";
            }

            myDiagram.nodeTemplate =
                $(go.Node, "Vertical",
                    { contextMenu: myContextMenu },
                    { locationObjectName: "ICON" },
                    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                    $(go.Panel, "Table",
                        { defaultAlignment: go.Spot.Left },
                        $(go.Panel, "Auto",
                            { name: "ICON" },
                            $(go.Shape,
                                { fill: null, stroke: null },
                                new go.Binding("background", "problem", nodeProblemConverter),
                                new go.AnimationTrigger('background')),
                            $(go.Picture,
                                { margin: 5 },
                                new go.Binding("source", "type", nodeTypeImage),
                                new go.Binding("desiredSize", "type", nodeTypeSize)),
                        ),
                    ),
                    $(go.TextBlock,
                        // { editable: true, margin: 8, choices: ['Alpha', 'Beta', 'Gamma', 'Delta'] },
                        new go.Binding("text"))
                );
            myDiagram.linkTemplate =
                $(go.Link,
                    { routing: go.Link.AvoidsNodes,curve: go.Link.JumpGap  },
                    $(go.Shape,
                        { strokeWidth: 2, stroke: "gray" },
                        new go.Binding("stroke", "problem", linkProblemConverter),
                        new go.AnimationTrigger('stroke')),  // the link shape
                    $(go.Shape,   // the arrowhead
                        { toArrow: "Standard" }),
                    $(go.TextBlock,                        // this is a Link label
                         new go.Binding("text", "text"))
                );

            load();

            myDiagram.contextMenu = myContextMenu;

            cxElement.addEventListener("contextmenu", function(e) {
                e.preventDefault();
                return false;
            }, false);

            function hideCX() {
                if (myDiagram.currentTool instanceof go.ContextMenuTool) {
                myDiagram.currentTool.doCancel();
                }
            }

            function showContextMenu(obj, diagram, tool) {
                // Show only the relevant buttons given the current state.
                var hasMenuItem = false;
                function maybeShowItem(elt, pred) {
                    if (elt) {
                        elt.style.display = "block";
                        hasMenuItem = true;
                    }
                }
                maybeShowItem(document.getElementById("create"));
                maybeShowItem(document.getElementById("check"));
                maybeShowItem(document.getElementById("lock"));
                maybeShowItem(document.getElementById("edit"));
                maybeShowItem(document.getElementById("delete"));

                // Now show the whole context menu element
                if (hasMenuItem) {
                    cxElement.classList.add("show-menu");
                    // we don't bother overriding positionContextMenu, we just do it here:
                    var mousePt = diagram.lastInput.viewPoint;
                    cxElement.style.left = mousePt.x + 5 + "px";
                    cxElement.style.top = mousePt.y + "px";
                }

                // Optional: Use a `window` click listener with event capture to
                //           remove the context menu if the user clicks elsewhere on the page
                window.addEventListener("click", hideCX, true);
            }

            function hideContextMenu() {
                cxElement.classList.remove("show-menu");
                // Optional: Use a `window` click listener with event capture to
                //           remove the context menu if the user clicks elsewhere on the page
                window.removeEventListener("click", hideCX, true);
            }

            function showMessage(s) {
                document.getElementById("diagramEventsMsg").textContent = s;
            }
            
            myDiagram.addDiagramListener("ObjectSingleClicked",
                function (e) {
                    var part = e.subject.part;
                    if (!(part instanceof go.Link)) showMessage("Clicked on: " + part.data.key);
                });

            function randomProblems() {
                var model = myDiagram.model;
                // update all nodes
                var arr = model.nodeDataArray;
                var arr1 = model.linkDataArray;
            }

            function loop() {
                randomProblems();
                // setTimeout(function () { randomProblems(); loop(); }, 1000);
            }
            loop();  // start the simulation
        }

        function load() {
            myDiagram.model = go.Model.fromJson(that.sampleData);
        }

        function test(e, obj) {
            diagram.commit(function(d) {
                // get the context menu that holds the button that was clicked
                var contextmenu = obj.part;
                // get the node data to which the Node is data bound
                var nodedata = contextmenu.data;
                // compute the next color for the node
                var newcolor = "lightblue";
                switch (nodedata.color) {
                    case "lightblue": newcolor = "lightgreen"; break;
                    case "lightgreen": newcolor = "lightyellow"; break;
                    case "lightyellow": newcolor = "orange"; break;
                    case "orange": newcolor = "lightblue"; break;
                }
                // modify the node data
                // this evaluates data Bindings and records changes in the UndoManager
                d.model.set(nodedata, "color", newcolor);
            }, "changed color");
        }

		init();

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		
	});
}