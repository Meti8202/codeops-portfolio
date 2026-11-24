<?php

return [
     'free_delivery_from' => (int) env(
          'ADDIS_EATS_FREE_DELIVERY_FROM',
          50000
     ),

     'zones' => [
          'Bole',
          'Kazanchis',
          'Piassa',
          'Megenagna',
     ],
];
