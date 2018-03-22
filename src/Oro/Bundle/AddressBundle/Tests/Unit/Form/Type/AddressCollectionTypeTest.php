<?php
namespace Oro\Bundle\AddressBundle\Tests\Unit\Form\Type;

use Oro\Bundle\AddressBundle\Form\Type\AddressCollectionType;
use Oro\Bundle\FormBundle\Form\Type\CollectionType;

class AddressCollectionTypeTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var AddressCollectionType
     */
    protected $type;

    /**
     * Setup test env
     */
    protected function setUp()
    {
        $this->type = new AddressCollectionType();
    }

    public function testGetParent()
    {
        $this->assertEquals(CollectionType::class, $this->type->getParent());
    }
}
