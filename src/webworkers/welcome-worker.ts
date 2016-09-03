declare function postMessage(response: any);

const createMenuMessage = "create-menu";

onmessage = function(e) {
    if (e.data.action === createMenuMessage) {
        let result = "";

        for(let course of e.data.data) {
            result += `<li click.delegate="itemSelected($event)">${course.Name}</li>\n`
        }

        postMessage({
            action: createMenuMessage,
            result: result
        });
    }
};



