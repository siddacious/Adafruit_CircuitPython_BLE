import time

import _bleio

from adafruit_ble import BLERadio
from adafruit_ble.attributes import Attribute
from adafruit_ble.services import Service
from adafruit_ble.uuid import VendorUUID
from adafruit_ble.characteristics import Characteristic


# _LONG_SERVICE_UUID =  0x09b600A03e4241fcb474e9c0c8f0c801
# _NOTIFICATION_UUID  = 0x09b600b03e4241fcb474e9c0c8f0c801
# _WRITE_UUID =         0x09b600b13e4241fcb474e9c0c8f0c801

class RobotControlService(Service):
    """Service for interacting with a Robot Friend.
    """
    uuid = VendorUUID('09B600A0-3E42-41FC-B474-E9C0C8F0C801')

    whisperer = Characteristic(
        uuid=VendorUUID('09B600B1-3E42-41FC-B474-E9C0C8F0C801'),
        properties=Characteristic.WRITE | Characteristic.WRITE_NO_RESPONSE,
        )

    decoder = Characteristic(
        uuid=VendorUUID('09B600B0-3E42-41FC-B474-E9C0C8F0C801'),
        properties=Characteristic.NOTIFY,
        )


ble = BLERadio()

robot_conn = None
# 2220 01
# repeated multiple times, then
# 2742 0f44 4400 1f00
# 2742 0f44 4400 1802
while True:
    print("Scanning")
    for adv in ble.start_scan():
        print("Found adv:", adv.complete_name, "RSSI:", adv.rssi)
        print(repr(adv))
        if adv.complete_name == 'DROID':
            print("Found Robot")
            robot_conn = ble.connect(adv)
            print("Connected to Robot")
            break

    ble.stop_scan()
    print("Stopped scan")

    try:
        if robot_conn and robot_conn.connected:
            print("Getting service")
            robot_service = robot_conn[RobotControlService]
            print("Writing to whisperer")
            robot_service.whisperer = bytes([0x22,0x20,0x01])
            robot_service.whisperer = bytes([0x22,0x20,0x01])
            robot_service.whisperer = bytes([0x22,0x20,0x01])
            robot_service.whisperer = bytes([0x22,0x20,0x01])
            robot_service.whisperer = bytes([0x27,0x42,0x0f,0x44,0x44,0x00,0x1f,0x00])
            robot_service.whisperer = bytes([0x27,0x42,0x0f,0x44,0x44,0x00,0x18,0x02])

            while robot_conn.connected:
                print("reading from bot?", robot_service.decoder)

    except _bleio.ConnectionError as e:
        print("\t", e.args)
        try:
            robot_conn.disconnect()
        except _bleio.ConnectionError:
            pass
