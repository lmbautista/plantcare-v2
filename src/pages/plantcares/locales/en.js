export default {
  theGarden: {
    title: 'The garden',
    subtitle: 'Take care of your plants remotely',
    description:
      'Here you could manage each plantcare connected to the board: configure the soil moisture sensors, the waterpumps, check the watering status, schedule a seasonal watering and much more',
    new: 'New plantcare',
    howTo: 'How to',
    plantcaresNotFound: 'Plantcares not found'
  },
  theInstructions: {
    howSetup: {
      title: 'Setup your plantcare',
      subtitle: 'Steps to get your board ready',
      description:
        'Here you could find further details about how to configure step by step your board',
      stepOne: {
        title: 'Request your prototype',
        descriptionOne:
          'Now you got an account, the next step is to contact the Author to get your prototype ',
        descriptionTwo: 'Once you got it you could jump into the next step.',
        githubUser: '@lmbautista'
      },
      stepTwo: {
        title: 'Register a new plantcare',
        descriptionOne:
          'The prototype will have a sticker to locate the IDs of the wet sensor and the water pump. Those IDs  will be needed to register your plantcare ',
        descriptionTwo: 'here'
      },
      stepThree: {
        title: 'Place the physical devices',
        descriptionOne: 'Here are the resources to place:',
        descriptionTwo:
          'The prototype: as it´s charged by the sun, we recommended placing it outside. If not, you can also plug it into any common electric outlet via USB micro',
        descriptionThree: 'The wet sensor: place it near to the trunk and the watered zones',
        descriptionFour: 'The water pump: place it in a water tank'
      },
      stepFour: {
        title: 'Plantcare ready',
        description:
          'Once you placed all the devices, you´ll start receiving fresh information from your plantcare´s status(ensure the board is synced with your account with the wifi icon of the plantcare´s card).'
      }
    },
    howItworks: {
      title: 'How it works',
      subtitle: 'All you need to know',
      description: 'Here you could find further details about how plantcare works',
      explanaitions: {
        one: {
          title: 'Edit plantcare',
          description: 'Update the details and configuration of your plantcare'
        },
        two: {
          title: 'Watering scheduling',
          description: 'Manage the watering schedulin of your plantcare'
        },
        three: {
          title: 'Remove plantcare',
          description: 'Remove enterely your plantcare from the application'
        },
        four: {
          title: 'Last wet status connection',
          description: 'It shows the latest connection reported by your physical board'
        },
        five: {
          title: 'Current wet status',
          description: 'It shows the latest wet status reported by your physical board'
        },
        six: {
          title: 'Last watering',
          description: 'It shows the latest watering processed by your physical board'
        },
        seven: {
          title: 'Next scheduled watering',
          description:
            'It shows the upcoming watering scheduled to be processed by your physical board'
        }
      }
    }
  },
  theWatering: {
    title: 'The watering',
    subtitle: 'Pending watering scheduled',
    description:
      'Here you could check and manage the current list of pending watering for your plantcares',
    new: 'New watering',
    wateringsNotFound: 'Waterings not found'
  },
  theConnectivity: {
    title: 'The connectivity',
    subtitle: 'Physical prototypes activity',
    description:
      'Here you could check the latest connections of the prototypes. In that way, we ensure they will work as expected',
    connectionsNotFound: 'Connections not found'
  }
};
