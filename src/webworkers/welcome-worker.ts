declare function postMessage(response: any);

onmessage = function(e) {
    console.log('Message received from main script');
    
    if (e.data === "greet") {
        postMessage("hello world");
    }
};



