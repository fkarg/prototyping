#!/usr/env python3

import os
import logging

log = logging.getLogger(__name__)


def create_parser():
    import argparse

    parser = argparse.ArgumentParser(
        description="",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "--nocolor", action="store_true", help="deactivate colored log output"
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="count",
        default=0,
        help="make logging output (more) verbose. Default (or 0) is ERROR, -v is WARN, -vv is INFO and -vvv is DEBUG. Can be passed multiple times.",
    )

    return parser


def main(**kwargs):
    pass


def get_logging_level(args):
    if args.verbose >= 3:
        return logging.DEBUG
    if args.verbose == 2:
        return logging.INFO
    if args.verbose >= 1:
        return logging.WARNING
    return logging.ERROR


def set_log_level_format(logging_level, format):
    logging.addLevelName(logging_level, format % logging.getLevelName(logging_level))


if __name__ == "__main__":
    args = create_parser().parse_args()

    loglevels = [
        logging.DEBUG,
        logging.INFO,
        logging.WARNING,
        logging.ERROR,
        logging.CRITICAL,
    ]
    logformats = [
        "\33[0;37m%-8s\033[1;0m",  # DEBUG
        "\33[1;32m%-8s\033[1;0m",  # INFO
        "\33[1;33m%-8s\033[1;0m",  # WARNING
        "\33[1;31m%-8s\033[1;0m",  # ERROR
        "\33[1;41m%-8s\033[1;0m",  # CRITICAL
    ]
    loggingformats = list(zip(loglevels, logformats))

    # check if the terminal supports colored output
    colors = os.popen("tput colors 2> /dev/null").read()
    if colors and int(colors) < 8 or args.nocolor:
        # do not show colors, either not enough are supported or they are not
        # wanted
        nocolor = True
        for level, _format in loggingformats:
            set_log_level_format(level, "%-8s")
    else:
        nocolor = False
        for level, format in loggingformats:
            set_log_level_format(level, format)

    logging.basicConfig(level=get_logging_level(args))
    log = logging.getLogger(__name__)
    log.info("Executing as main")
    log.debug("Using terminal color output: %r" % (not nocolor))

    log.debug("Args passed: " + str(args))
    main(**vars(args))
