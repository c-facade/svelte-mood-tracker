# TODO


## GIÀ FATTI

- creare i componenti login, logout, register ?
- oppure uno solo che cambia? no non conviene
- popolare pagine come about e settings
- fare la struttura dati dei settings
- implementare l'autenticazione
- oppure farlo bene dall'inizio ma devo capire come si fa l'API
- iniziare a guardare la grafica e il css
- magari mettere emoticons per ora
- migliorare tab bar OK
- header con titolo? OK
- cambiare titolo html OK
- mettere emoticons nel diario
- migliorare il touch target dei wrapper OK
- togliere i settings se proprio non ne abbiamo OK\
- mettere i padding giusti per il cellulare OK
- mettere la barra di caricamento su diario OK
- material icon per okay ??
- spostarsi sul diario quando si sottomette il form
- e resettarlo (togliere preventDefault??)
- stili per desktop...
- creare grafiche ottimizzate per il telefono.
- abilitare persistent storage
- implementare lo storage permanente (magari non preoccupandosi della sincronizzazione?)

## DA FARE

- poi iniziare a fare il logo
- nuovo gruppo 
- statistiche 
- aggiungere notifiche

- fix load default activities!
- più grosse nel readme.


## PWA IMPROVEMENTS

Show install prompt:

	// Initialize deferredPrompt for use later to show browser install prompt.
	let deferredPrompt;

	window.addEventListener('beforeinstallprompt', (e) => {
		// Prevent the mini-infobar from appearing on mobile
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;
		// Update UI notify the user they can install the PWA
		showInstallPromotion();
		// Optionally, send analytics event that PWA install promo was shown.
		console.log(`'beforeinstallprompt' event was fired.`);
	});

