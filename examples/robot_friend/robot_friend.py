from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement, Advertisement, to_hex
from adafruit_ble.services.standard.device_info import DeviceInfoService
# from adafruit_ble_berrymed_pulse_oximeter import BerryMedPulseOximeterService
import time
from micropython import const
from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
import struct
import _bleio
from adafruit_ble.attributes import Attribute
from adafruit_ble.services import Service
from adafruit_ble.services.standard import GenericAttribute, GenericAccess
from adafruit_ble.uuid import StandardUUID, VendorUUID
from adafruit_ble.characteristics import Characteristic, ComplexCharacteristic




# _LONG_SERVICE_UUID =  0x09b600A03e4241fcb474e9c0c8f0c801
# _NOTIFICATION_UUID  = 0x09b600b03e4241fcb474e9c0c8f0c801
# _WRITE_UUID =         0x09b600b13e4241fcb474e9c0c8f0c801
_SERVICE_UUID = VendorUUID('09B600A0-3E42-41FC-B474-E9C0C8F0C801')
_NOTIFICATION_CHARACTERISTIC_UUID = VendorUUID('09B600B0-3E42-41FC-B474-E9C0C8F0C801')
_WRITE_CHARACTERISTIC_UUID = VendorUUID('09B600B1-3E42-41FC-B474-E9C0C8F0C801')
_GENERIC_ACCESS_UUID = StandardUUID(0x1800)
_GENERIC_ATTRIBUTE_UUID = StandardUUID(0x1801)
_NOTIFY_CHARACTERISTIC_UUID = StandardUUID(0x2902)

class RobotWriteCharacterisic(Characteristic):
    """Robot whisperer"""

    # pylint: disable=too-few-public-methods
    uuid = _WRITE_CHARACTERISTIC_UUID

    def __init__(self, **kwargs):
        super().__init__(
            properties=(
                Characteristic.WRITE
                | Characteristic.WRITE_NO_RESPONSE
            ),
            **kwargs,
        )

class RobotNotifyCharacterisic(Characteristic):
    """Robot decoder"""

    # pylint: disable=too-few-public-methods
    uuid = _NOTIFICATION_CHARACTERISTIC_UUID

    def __init__(self, **kwargs):
        super().__init__(
            properties=(
                Characteristic.NOTIFY
            ),
            **kwargs,
        )

class RobotControlService(Service):
    """Service for interacting with a Robot Friend.
    """

    def __init__(self, service=None):
        super().__init__(service=service)
        self._settings_result_buf = None
        self._realtime_data_buf = None

    uuid = _SERVICE_UUID

    # notify = RobotNotifyCharacterisic()
    # write = RobotWriteCharacterisic()



ble = BLERadio()
while True:
    while ble.connected:
        for connection in ble.connections:
            print(repr(connection))
            if GenericAttribute in connection:
                attr_svc = connection[GenericAttribute]
                print("\tmade a GenericAttribute:", repr(attr_svc))
                print("\t%d characterisitcs"%len(attr_svc.bleio_service.characteristics))
            # this is the piece that's getting stuck/not finishing quickly enough
            res = connection._bleio_connection.discover_remote_services(
                service_uuids_whitelist=(_SERVICE_UUID.bleio_uuid,)
            )
            # does not finish before the robot hangs up the connection
            # if RobotControlService in connection:
            #     robot_serv = connection[RobotControlService]
            #     print("made a RobotControlService")
            #     print(repr(robot_serv))
            #     for x in dir(robot_serv): print(repr(x))
        time.sleep(1)

    print("disconnected, scanning")
    for ad in ble.start_scan(timeout=4):
        print("Found ad:", ad.complete_name, "RSSI:", ad.rssi)
        print(repr(ad))
        if ad.complete_name == 'DROID':
            print("Found Robot")
            ble.connect(ad)
            break

    ble.stop_scan()
