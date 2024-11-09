<!-- This file was automatic generated. Do not edit it manually -->

<PropsTable :data="[
  {
    'name': 'activationMode',
    'description': '<p>Whether a tab is activated automatically or manually.</p>\n',
    'type': '\'automatic\' | \'manual\'',
    'required': false
  },
  {
    'name': 'defaultValue',
    'description': '<p>The value of the tab to select by default, if uncontrolled</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'dir',
    'description': '<p>The direction of navigation between toolbar items.</p>\n',
    'type': '\'ltr\' | \'rtl\'',
    'required': false
  },
  {
    'name': 'orientation',
    'description': '<p>The orientation the tabs are layed out.\nMainly so arrow navigation is done accordingly (left &amp; right vs. up &amp; down)</p>\n',
    'type': '\'horizontal\' | \'vertical\'',
    'required': false
  },
  {
    'name': 'value',
    'description': '<p>The value for the selected tab, if controlled</p>\n',
    'type': 'string',
    'required': false
  }
]" />

<EmitsTable :data="[
  {
    'name': 'update:value',
    'description': '',
    'type': '[value: string]'
  }
]" />
